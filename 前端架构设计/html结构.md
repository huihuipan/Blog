# html 结构

## OOCSS
分离结构和外观: 意味着将视觉特性定义为可复用的单元。前面那段简单的切换就是一个
简短的可复用性强的例子，可以套用很多不同的外观样式。例如，当前的“simple”皮肤
使用直角，而“complex”皮肤可能使用圆角，还加了阴影。

分离容器和内容: 指的是不再将元素位置作为样式的限定词。和在容器内标记的CSS 类名
不同，我们现在使用的是可复用的CSS 类名，如toggle-title，  它应用于相应的文本处理
上，而不管这个文本的元素是什么。这种方式下，如果没有应用别的CSS 类名，你可以让
H1 标签以默认的样式呈现。

```html
<div class="toggle simple"> 
  <div class="toggle-control open"> 
    <h1 class="toggle-title">Title 1</h1> 
  </div> 
  <div class="toggle-details open"> ... </div> 
  ... 
</div>

```


## SMACSS

基础: 如果不添加CSS 类名，标记会以什么外观呈现。
布局: 把页面分成一些区域。
模块: 设计中的模块化、可复用的单元。
状态: 描述在特定的状态或情况下，模块或布局的显示方式。
主题: 一个可选的视觉外观层，可以让你更换不同主题。

```html
<div class="toggle simple"> 
  <div class="toggle-control open"> 
    <h1 class="toggle-title">Title 1</h1> 
  </div> 
  <div class="toggle-details open"> ... </div> 
  ... 
</div>

```

## BEM

块名: 所属组件的名称。
元素: 元素在块里面的名称。
修饰符: 任何与块或元素相关联的修饰符。

```html
<div class="toggle toggle--simple"> 
  <div class="toggle__control toggle__control--active"> 
    <h1 class="toggle__title">Title 1</h1> 
  </div> 

  <div class="toggle__details toggle__details--active"> 
    ... 
  </div> 
  ... 
</dl>
```