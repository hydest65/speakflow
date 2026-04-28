# SpeakFlow Render 部署说明

## 当前项目类型

SpeakFlow 当前是纯静态网站：

- HTML
- CSS
- JavaScript
- 本地图片资源

不需要安装依赖，也不需要构建命令。

## Render 配置

项目根目录已添加：

```text
render.yaml
```

配置含义：

- `env: static`：按静态站部署。
- `buildCommand: ""`：无需构建。
- `staticPublishPath: .`：直接发布项目根目录。
- `pullRequestPreviewsEnabled: true`：后续接 GitHub PR 时可以生成预览。

## 推荐上线步骤

1. 用 GitHub Desktop 把当前文件夹初始化为 Git 仓库。
2. 发布到 GitHub。
3. 打开 Render。
4. New + → Static Site。
5. 选择 GitHub 仓库。
6. Render 会读取 `render.yaml`。
7. 部署完成后，打开 Render 提供的外网 URL 测试。

## Render 手动设置

如果不使用 `render.yaml`，手动配置如下：

- Build Command：留空
- Publish Directory：`.`
- Root Directory：留空或项目根目录

## 测试重点

部署完成后检查：

- 首页 `index.html` 能打开。
- 顶部导航能跳转到收藏夹、Tips、AI陪练、会员。
- `styles.css` 正常加载。
- `app.js` 正常加载。
- `assets/` 下资源正常加载。

