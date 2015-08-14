
var qrcode = require('../src/index.js');
var $ = require('jquery');
var expect = require('expect.js');

describe('qrcode', function() {
  it('参数为空', function() {
    var qrnode = new qrcode();

  });
  it('参数是字符串', function() {
    var qrnode = new qrcode('www.alipay.com');
  });
  it('参数为JSON格式且为空', function() {
    var qrnode = new qrcode({});
  });
  it('设置地址参数', function() {
    var qrnode = new qrcode({
      text:'www.alipay.com'
    });
  });
  it('设置二维码高度', function() {
    var qrnode = new qrcode({
      height:300
    });
  });
  it('设置二维码宽度', function() {
    var qrnode = new qrcode({
      width:300
    });
  });
  it('设置二维码前景色', function() {
    var qrnode = new qrcode({
      background:'#100'
    });
  });
  it('设置二维码背景色', function() {
    var qrnode = new qrcode({
      foreground:'#011'
    });
  });
  it('以table来显示', function() {
    var qrnode = new qrcode({
      render:'table'
    });
  });
  it('以svg来显示', function() {
    var qrnode = new qrcode({
      render:'svg'
    });
  });
  it('以canvas来显示', function() {
    var qrnode = new qrcode({
      render:'canvas'
    });
  });
  it('以如果render传入错误参数，以default形式显示', function() {
    var qrnode = new qrcode({
      render:'adsjlj'
    });
  });
  it('最长字符串', function() {
    var s = '';
    for(var i = 0; i < 2953; i++){
      s += i%10;
    }
    var qrnode = new qrcode({
      width:500,
      height:500,
      text:s,
      correctLevel:0
    });
  });
  it('超过最长字符串容错处理，截取前2953个字符', function() {
    var s = '';
    for(var i = 0; i < 3000; i++){
      s += i%10;
    }
    var qrnode = new qrcode({
      width:500,
      height:500,
      text:s,
      correctLevel:0
    });
  });
  it('中文容错', function() {
    var qrnode = new qrcode('你好');
  });
  it('设置logo', function() {
    var qrnode = new qrcode({
      image : 'https://t.alipayobjects.com/images/rmsweb/T1ZsxhXdxbXXXXXXXX.png'
    });
  });
  it('设置pdground', function() {
    var qrnode = new qrcode({
      pdground : '#ff0000'
    });
  });
});
