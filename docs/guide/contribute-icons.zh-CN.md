---
nav: 指南
group:
  title: 其他
  order: 3
---

# 如何添加图标

加密行业日新月异，新的项目和标准不断涌现。我们欢迎社区贡献图标，以便更好地支持这些项目。

## 添加图标文件

`packages/icons` 目录对应了 `@ant-design/web3-icons` 包，新的图标应该添加在这个目录下，具体为：

<Tree>
  <ul>
    <li>
      src
      <ul>
        <li>
          components
          <ul>
            <li>YOUR-ICON.tsx<small>添加图标组件</small></li>
          </ul>
        </li>
        <li>
          svgs
          <ul>
            <li>YOUR-ICON.svg<small>添加图标 svg</small></li>
          </ul>
        </li>
      </ul>
    </li>
    <li>index.ts<small>统一导出</small></li>
  </ul>
</Tree>

## 添加图标 svg

在 `svgs` 目录下添加新的 svg 文件，文件名应该和图标名称一致，注意文件名应该使用 [kebab-case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case) 风格。

svg 里面如果需要使用 `id` 或者 `classname`，需要加上前缀 `ant-web3-icon-`，这是为了避免 `svgo` 将其简化导致找不到类型。svg 中尽量使用内联的方式写样式，比如颜色用 `fill: #fff`。

好的写法：

```svg
<path
  style="fill:#020041;"
  d="M1494.8,856.4c171.5,289.1,336.4,582.2,505.2,873c-168.6,0.6-337.1-1-505.6,0C1493.8,1438.3,1492.9,1147.3,1494.8,856.4"
/>
```

可能有问题的写法：

```svg
<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="color">
  <stop stop-color="#FF8B8B" offset="0%"></stop>
  <stop stop-color="#FF1717" offset="100%"></stop>
</linearGradient>
```

```svg
<path
  fill:url(#color)
  d="M1494.8,856.4c171.5,289.1,336.4,582.2,505.2,873c-168.6,0.6-337.1-1-505.6,0C1493.8,1438.3,1492.9,1147.3,1494.8,856.4"
/>
```

这些例子里使用了 id 匹配，这样会导致多个相同 svg 同时出现的时候，样式冲突或丢失。

## 完成图标 react 组件

在 `components` 目录下参考如下模板完成组件，有两部分需要更改：

1. 图标组件名称
2. svg 引入地址

```tsx | pure
import * as React from 'react';
import AntdIcon from '@ant-design/icons';
import { type IconBaseProps } from '@ant-design/icons/lib/components/Icon';
import { ConfigProvider } from 'antd';
import classnames from 'classnames';

import SVGComponent from '../svgs/aave-circle-colorful.svg';

export const AAVECircleColorful = React.forwardRef<HTMLSpanElement, IconBaseProps>((props, ref) => {
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('web3-icon-aave-circle-colorful');
  return (
    <AntdIcon
      {...props}
      className={classnames(prefixCls, props.className)}
      ref={ref}
      component={SVGComponent}
    />
  );
});
AAVECircleColorful.displayName = 'AAVECircleColorful';
```

## 命名规范

通过 icon 的展示形式分了四种类型：

- circle colorful
- colorful
- circle filled
- filled

命名规范为：`项目名-类型名称`，比如 `aave-circle-colorful`，使用正确的命名规范会在文档中自动分类。

根据 icon 对应项目的功能做了以下几种区分：

- Chain Icons
- Token Icons
- Tool Icons

如果需要特别声明，可以在 `.dumi/theme/builtins/IconSearch/fields.ts` 文件中更改，否则会归为默认分类。

## 验证

在 `src/index.ts` 中将新添加的 icon 导出，然后可以在本地调试环境验证图标的展示是否正确。