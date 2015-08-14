# qrcode

---

[![spm package](http://spmjs.io/badge/arale-qrcode)](http://spmjs.io/package/arale-qrcode)
[![Build Status](https://travis-ci.org/aralejs/qrcode.png)](https://travis-ci.org/aralejs/qrcode)
[![Coverage Status](https://coveralls.io/repos/aralejs/qrcode/badge.png?branch=master)](https://coveralls.io/r/aralejs/qrcode)

二维码组件，用于绘制二维码。

已添加UTF-8编码，中文生成的二维码扫描不会出现乱码。

[二维码编码原理](http://www.thonky.com/qr-code-tutorial/)

---

## 配置说明

### render `string`

配置用哪个节点元素画二维码，选项有`table`、`svg`和`canvas`

默认的选择顺序为 `canvas` -> `svg` -> `table`

### text `string`

要编码的字符串

默认：`""`

### size `number`

二维码的宽和高，单位是px，只允许生成正方形二维码

需要注意的是，当使用table绘制二维码时，会适当减小，使得能够整除二维码矩阵的维度。

默认：`256`

### correctLevel `number`

纠错级别，可取0、1、2、3，数字越大说明所需纠错级别越大

默认：`3`

### background `color`

背景色

默认：`#FFFFFF`

### foreground `color`

前景色

默认：`#000000`

### pdground `color`

三个角的颜色

默认：foreground

### image `string`

码正中间图片的url，只支持配置正方形图片

默认：`''`

### imageSize `number`

image的宽和高，单位px

默认：`30`


## other

支持script标签引用，暴露全局变量为 AraleQRCode

```
<script src='dist/arale-qrcode/3.0.2/lib/index.js'></script>
<script> 
	new AraleQRCode({...});
</script>
```