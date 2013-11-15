# qrcode

---

[![Build Status](http://toast.corp.taobao.com/task/state/id/3476)](http://toast.corp.taobao.com/task/view/id/3476)

二维码组件，用于绘制二维码

注意：该组件只支持ASCII字符串

[二维码编码原理](http://www.thonky.com/qr-code-tutorial/)

---

## 配置说明

### render `string`

配置用哪个节点元素画二维码，选项有`table`、`svg`和`canvas`

默认的选择顺序为 `canvas` -> `svg` -> `table`

### text `string`

要编码的ASCII字符串，只支持ASCII

默认：`""`

### width `number`

二维码的长，单位是px

需要注意的是，当使用table或者svg绘制二维码时，会适当减小，使得能够整除二维码矩阵的维度。

默认：`256`

### height `number`

二维码的宽，单位是px

需要注意的是，当使用table或者svg绘制二维码时，会适当减小，使得能够整除二维码矩阵的维度。

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


