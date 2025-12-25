// 创建占位图片的脚本
const fs = require('fs');
const path = require('path');

// 确保images目录存在
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// 创建banner图片的占位文件
for (let i = 1; i <= 5; i++) {
  const bannerPath = path.join(imagesDir, `banner${i}.jpg`);
  // 创建一个简单的占位文件
  fs.writeFileSync(bannerPath, Buffer.from([]), { flag: 'w' });
  console.log(`Created placeholder image: ${bannerPath}`);
}

console.log('All placeholder images created successfully!');