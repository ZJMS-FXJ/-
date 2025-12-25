// app.js
App({
  onLaunch() {
    // 初始化云开发环境
    if (wx.cloud) {
      wx.cloud.init({
        env: 'cloud1-9gd741ozadf1f8c8', // 替换为你的云开发环境ID
        traceUser: true
      });
    }
    
    // 初始化时检查本地存储，确保购物车、地址列表、历史订单等数据结构存在
    if (!wx.getStorageSync('cart')) {
      wx.setStorageSync('cart', []);
    }
    if (!wx.getStorageSync('addressList')) {
      wx.setStorageSync('addressList', []);
    }
    if (!wx.getStorageSync('historyOrders')) {
      wx.setStorageSync('historyOrders', []);
    }
    if (!wx.getStorageSync('userInfo')) {
      wx.setStorageSync('userInfo', { isLogin: false });
    }
    
    // HarmonyOS适配：获取设备信息
    this.getPlatformInfo();
  },
  
  // 获取平台信息，判断是否为鸿蒙系统
  getPlatformInfo() {
    wx.getDeviceInfo({
      success: (res) => {
        console.log('设备详细信息：', res);
        // 判断是否为鸿蒙系统（核心兼容逻辑）
        const isHarmonyOS = res.system?.toLowerCase().includes('harmony') || res.platform === 'harmony' || res.platform === 'ohos';
        console.log('是否为鸿蒙系统：', isHarmonyOS);
        
        // 存储到全局，供页面调用
        this.globalData = {
          ...this.globalData,
          isHarmonyOS,
          system: res.system, // 系统类型（iOS/Android/HarmonyOS）
          platform: res.platform, // 平台标识（ios/android/harmony/ohos）
          deviceInfo: res
        };

        // 鸿蒙系统特殊兼容（可选，业务无需额外处理，仅示例）
        if (isHarmonyOS) {
          // 鸿蒙系统下文件保存路径适配（与iOS/Android逻辑一致，无需修改）
          console.log('当前为鸿蒙系统，文件保存逻辑已自动兼容');
        }
      },
      fail: (err) => {
        console.error('获取设备信息失败:', err);
        // 降级使用wx.getSystemInfo（兼容低版本基础库）
        wx.getSystemInfo({
          success: (res) => {
            const isHarmonyOS = res.system?.toLowerCase().includes('harmony');
            this.globalData = {
              ...this.globalData,
              isHarmonyOS,
              system: res.system, 
              platform: res.platform,
              deviceInfo: res
            };
            console.log('降级获取设备信息：', res);
            console.log('是否为鸿蒙系统：', isHarmonyOS);
          },
          fail: (systemErr) => {
            console.error('降级获取设备信息失败:', systemErr);
            // 最终降级方案
            this.globalData = {
              ...this.globalData,
              isHarmonyOS: false,
              system: 'unknown',
              platform: 'unknown',
              deviceInfo: null
            };
          }
        });
      }
    });
  },
  
  globalData: {
    userInfo: null,
    // HarmonyOS适配相关
    deviceInfo: null,
    isHarmonyOS: false,
    system: '',
    platform: ''
  }
})