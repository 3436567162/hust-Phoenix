---
title: Superpowers 框架完全指南：让 Claude Code 和 Codex 拥有“超能力”
description: 介绍 Superpowers 的核心理念、技能系统、安装方式，以及它如何把 Claude Code、Codex 这类编码代理拉回到更工程化的工作流里。
date: 2026-03-22
category: 学习总结
tags:
  - Superpowers
  - Claude Code
  - Codex
  - AI
  - Workflow
featured: true
draft: false
---

> 这篇文章是我对 Superpowers 框架的一次系统整理。原文最早发布在 [tinyash.com](https://www.tinyash.com/blog/superpowers-claude-code-codex/) ，这里做了适合当前博客结构的重新编排。

## Superpowers 是什么？

Superpowers 是 Jesse Vincent 发起的一套面向 AI 编程代理的工作流框架。它不是一个“模型增强插件”，而更像一组强制执行的软件工程纪律。

它最重要的思想只有一句话：

> 不让 AI 一上来就写代码，而是先理解需求、确认设计、拆分计划，再进入执行。

如果你长期使用 Claude Code、Codex、Cursor Agent 这类工具，很快就会发现一个共同问题：模型通常很擅长“立刻开始干活”，但不一定擅长“在动手前把问题想清楚”。Superpowers 的价值正是在这里，它用技能（Skills）和标准化流程，把 AI 从“会写代码”推进到“像工程师一样工作”。

## 它强制 AI 遵循什么流程？

Superpowers 的完整流程大致是：

1. 头脑风暴：先澄清需求，识别模糊点
2. 设计确认：把设计分块展示，等待用户签字
3. 实现计划：把工作拆成 2 到 5 分钟的小任务
4. 执行开发：结合 TDD 和子代理机制逐步实现
5. 代码审查：每个阶段完成后做规范与质量复核
6. 分支收尾：决定合并、PR、保留还是丢弃

这套流程看起来保守，但它恰好解决了 AI 编码最常见的几个失误：

- 没真正理解需求就开始写
- 过早进入实现，导致后面不断返工
- 测试和验证滞后
- 代码能跑，但结构和边界不稳

换句话说，Superpowers 并不是让 AI 更“快”，而是让它更“稳”。

## Skills 系统为什么是核心？

Superpowers 的核心不是某个脚本，而是技能系统。

每个技能本质上都是一个带 `SKILL.md` 的目录，里面定义：

- 什么时候触发
- 应该怎么执行
- 输出应该长什么样

重要的是：这些技能在框架里不是建议，而是约束。

比如：

- `brainstorming`：开始实现前先讨论需求和设计
- `writing-plans`：把设计写成可执行的小任务计划
- `using-git-worktrees`：为实现创建隔离工作区
- `subagent-driven-development`：让不同子代理按任务执行
- `test-driven-development`：强制走 RED-GREEN-REFACTOR
- `requesting-code-review`：完成后请求代码审查
- `finishing-a-development-branch`：统一收尾分支工作

这意味着 AI 不再只是“听懂一句话然后开始补全”，而是会先检查：当前任务是否应该触发某种工程流程。

## 它解决了哪些实际问题？

如果没有这类流程约束，AI 编程很容易落入一种假高效：

- 看起来回复很快
- 很少追问
- 第一版代码产出也不慢

但真正的问题会在后面出现：

- 设计假设没有对齐
- 修改一个点要返工一大片
- 测试缺失，修完不敢确认真的好了
- 用户不断说“不是这个意思”

Superpowers 的优势恰好体现在这些地方：

- 先问清楚真正目标
- 用设计确认降低误解成本
- 把任务拆细以后，模型更不容易跑偏
- 把测试和验证纳入标准流程

对个人开发者来说，它的意义不是“更正式”，而是“更少重复劳动”。

## Claude Code 上怎么安装？

如果你在用 Claude Code，最简单的方式是通过插件市场安装。

```bash
claude
/plugin install superpowers@claude-plugins-official
```

或者先添加市场再安装：

```bash
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

安装完成后，重启 Claude Code，一般会看到一段会话启动提示，提醒模型去加载 Superpowers 的入门技能。

更新也比较直接：

```bash
/plugin update superpowers
```

## Codex 上怎么安装？

Codex 依赖本地技能发现，所以安装方式更偏手工。

### 1. 克隆仓库

```bash
git clone https://github.com/obra/superpowers.git ~/.codex/superpowers
```

### 2. 把技能目录接到 Codex 可发现的位置

```bash
mkdir -p ~/.agents/skills
ln -s ~/.codex/superpowers/skills ~/.agents/skills/superpowers
```

如果你在 Windows 上，不想处理管理员权限，可以用 Junction：

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
cmd /c mklink /J "$env:USERPROFILE\.agents\skills\superpowers" "$env:USERPROFILE\.codex\superpowers\skills"
```

### 3. 可选：打开多代理能力

部分技能依赖 Codex 的多代理支持，例如并行分发和子代理开发。

```toml
[features]
multi_agent = true
```

最后重启 Codex，让技能重新被发现。一个简单的验证方式是直接问：

```text
Tell me about your superpowers
```

## 哪些技能最值得先理解？

如果你第一次接触 Superpowers，不需要一下子把所有技能都记住。我更建议先理解下面几类：

### 1. 设计与规划类

- `brainstorming`
- `writing-plans`

它们决定了 AI 在写代码前是否先把问题范围收清楚。

### 2. 执行类

- `using-git-worktrees`
- `subagent-driven-development`
- `test-driven-development`

这一组会把“怎么动手做”从临场发挥，变成有组织的工程动作。

### 3. 审查与收尾类

- `requesting-code-review`
- `receiving-code-review`
- `finishing-a-development-branch`

这类技能的价值在于：不把“能跑”误认为“完成”。

## 它背后的几条核心原则

我觉得 Superpowers 真正值得借鉴的，不只是技能本身，而是背后的方法论：

### 1. TDD 优先

先写测试，再写实现。  
测试不只是验证工具，也是规格说明和设计约束。

### 2. 系统化胜过灵感式发挥

流程是为了减少猜测。  
当任务复杂、上下文长、修改链条多时，稳定流程比“聪明发挥”更可靠。

### 3. 复杂度要被主动压低

这里体现得很明显的几个原则是：

- YAGNI
- DRY
- KISS

AI 特别容易过度设计，所以这组约束尤其重要。

### 4. 证据胜过口头声明

不是说“应该修好了”，而是说：

- 测试通过了
- 构建通过了
- 页面生成了
- 审查通过了

这其实非常适合和 AI 协作，因为模型最容易在“解释看起来合理”时让人放松警惕。

## 它适合什么人？

如果你只是偶尔让 AI 写几个函数，Superpowers 可能会显得有点重。

但如果你处在下面这些场景里，它会非常有价值：

- 你已经频繁用 Claude Code / Codex 做真实项目
- 你开始关心 AI 写出来的代码是否可维护
- 你在多人协作或多分支环境里使用 AI
- 你不想让 AI 每次都“直接冲进实现”

对我来说，它最吸引人的一点是：它把 AI 从“代码生成器”重新拉回到了“工程协作者”的位置。

## 我的实际建议

如果你准备开始用 Superpowers，我建议按这个顺序来：

1. 先只用 `brainstorming` 和 `writing-plans`
2. 再接入 `test-driven-development`
3. 等你对任务拆分和验证有感觉后，再使用多代理相关技能

不要一开始就追求“把所有技能都开上”。  
先让 AI 养成在关键阶段停下来思考、澄清、验证的习惯，比一次性启用整套框架更重要。

## 总结

Superpowers 不是一个让模型“更聪明”的外挂，而是一套让模型“更守纪律”的工程框架。

它真正改变的不是补全能力，而是工作方式：

- 从直接写代码，变成先理解问题
- 从一次性生成，变成逐步验证
- 从单轮回答，变成完整开发流程

如果你已经在认真使用 Claude Code、Codex 或其他编码代理，我认为 Superpowers 值得花时间研究。哪怕你最终不完全照搬它的所有技能，单是其中“先设计、再拆分、后实现、全程验证”的思路，也足够让 AI 协作质量上一个台阶。
