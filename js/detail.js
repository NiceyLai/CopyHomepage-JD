window.addEventListener("load", function () {
  // 鼠标经过小图片盒子， 黄色遮挡层 和 大图片盒子显示，离开隐藏
  // 黄色的遮挡层跟随鼠标功能。
  // 移动黄色遮挡层，大图片跟随移动功能。
  let preview_img = document.querySelector(".preview_img");
  let mask = document.querySelector(".mask");
  let big = document.querySelector(".big");
  // 鼠标经过,黄色的遮挡层 和 大图片盒子显示，离开隐藏
  preview_img.addEventListener("mouseover", function () {
    mask.style.display = "block";
    big.style.display = "block";
  });
  preview_img.addEventListener("mouseout", function () {
    mask.style.display = "none";
    big.style.display = "none";
  });
  // 黄色的遮挡层跟随鼠标功能
  preview_img.addEventListener("mousemove", function (e) {
    // 鼠标在盒子内的坐标给黄色盒子
    // (1). 先计算出鼠标在盒子内的坐标
    let x = e.pageX - preview_img.offsetLeft;
    let y = e.pageY - preview_img.offsetTop;
    //   console.log(x, y);
    // (2) 减去盒子高度 300的一半 是 150 就是我们mask 的最终 left 和top值了
    // (3) 我们mask 移动的距离
    let maskX = x - mask.offsetWidth / 2;
    let maskY = y - mask.offsetHeight / 2;
    // (4) 如果x 坐标小于了0 就让他停在0 的位置
    // 遮挡层的最大移动距离
    let maskMax = preview_img.offsetWidth - mask.offsetWidth;
    if (maskX <= 0) {
      maskX = 0;
    } else if (maskX >= maskMax) {
      maskX = maskMax;
    }
    //正方形，长等于宽
    if (maskY <= 0) {
      maskY = 0;
    } else if (maskY >= maskMax) {
      maskY = maskMax;
    }
    mask.style.left = maskX + "px";
    mask.style.top = maskY + "px";
    // 移动黄色遮挡层，大图片跟随移动功能。
    // 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
    let bigImg = document.querySelector(".bigImg");
    let bigMax = bigImg.offsetWidth - big.offsetWidth;
    let bigX = (maskX * bigMax) / maskMax;
    let bigY = (maskY * bigMax) / maskMax;
    bigImg.style.left = -bigX + "px";
    bigImg.style.top = -bigY + "px";
  });
});
