# 预览链接说明

**Cursor 内 Simple Browser 对 Next.js 支持有限，容易一直加载。建议用系统浏览器打开。**

## 推荐：用系统浏览器打开（可正常显示）

1. **先启动开发服务器**（在 Cursor 终端执行一次）：
   ```bash
   npm run dev
   ```
   看到 `Ready in xxx ms` 和 `Local: http://localhost:xxxx` 后，记下端口（例如 3000 或 3004）。

2. **用系统浏览器打开预览**：
   - **Mac**：终端执行 `npm run preview`，会用默认浏览器打开 http://localhost:3000  
   - 若 dev 用的是其他端口（如 3004），在浏览器地址栏输入：**http://localhost:3004** 即可

3. **常用链接**（把端口换成你终端里显示的）：
   - 首页：`http://localhost:3000`
   - OTHER 刮刮乐：`http://localhost:3000/other`
   - READING：`http://localhost:3000/reading`

---

## 若仍想在 Cursor 内试 Simple Browser

- 先确保 `npm run dev` 已运行且无报错。
- `Cmd+Shift+P` → **Simple Browser: Show** → 输入 `http://localhost:3000`（或你的端口）。
- 若一直加载或白屏，请改用上面的**系统浏览器**方式。
