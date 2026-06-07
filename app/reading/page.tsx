'use client';

import NavBar from '../components/NavBar';

export default function ReadingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafaf8',
      color: '#1d1d1f',
      position: 'relative'
    }}>
      <NavBar />
      
      {/* 页面标题区域 */}
      <header style={{
        paddingTop: '100px',
        paddingBottom: '60px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <h1 style={{
          fontSize: '14px',
          letterSpacing: '6px',
          textTransform: 'uppercase',
          color: 'rgba(0, 0, 0, 0.35)',
          fontWeight: '300',
          marginBottom: '16px'
        }}>
          Portfolio
        </h1>
        <p style={{
          fontSize: '28px',
          fontWeight: '200',
          color: 'rgba(0, 0, 0, 0.85)',
          letterSpacing: '2px'
        }}>
          Design Works
        </p>
        <p style={{
          fontSize: '13px',
          color: 'rgba(0, 0, 0, 0.4)',
          marginTop: '8px'
        }}>
          2024产品体验设计师
        </p>
        <div style={{
          width: '40px',
          height: '1px',
          background: 'rgba(0, 0, 0, 0.15)',
          margin: '24px auto 0'
        }} />
      </header>

      {/* 项目内容 */}
      <main style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 48px 120px'
      }}>
        {/* 项目标题 */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '300',
            color: '#1d1d1f',
            marginBottom: '12px'
          }}>
            呱呱乐
          </h2>
          <p style={{
            fontSize: '15px',
            color: 'rgba(0, 0, 0, 0.5)',
            fontWeight: '300',
            lineHeight: '1.6'
          }}>
            桌面新玩法——以游戏化瓜分体验激活KK沉默用户
          </p>
          <div style={{
            display: 'flex',
            gap: '8px',
            marginTop: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {['游戏化设计', '增长策略', '桌面组件', 'AIGC提效', '品牌IP'].map((tag) => (
              <span key={tag} style={{
                fontSize: '11px',
                padding: '5px 12px',
                borderRadius: '4px',
                background: 'rgba(0, 0, 0, 0.04)',
                color: 'rgba(0, 0, 0, 0.5)',
                letterSpacing: '0.5px'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ========== Quick Facts ========== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
          background: 'rgba(0, 0, 0, 0.06)',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '72px'
        }}>
          {[
            { label: '角色', value: '产品体验设计师' },
            { label: '周期', value: '4周（2024 Q3）' },
            { label: '团队', value: '1设计 + 2前端 + 1PM + 1运营' },
            { label: '结果', value: 'KK DAU +1.5%，A/B验证全量' }
          ].map((item) => (
            <div key={item.label} style={{
              background: '#fafaf8',
              padding: '24px 20px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '11px',
                color: 'rgba(0, 0, 0, 0.35)',
                letterSpacing: '1px',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                {item.label}
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#1d1d1f'
              }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* ========== 需求背景 ========== */}
        <HorizontalSection title="需求背景">
          <p style={bodyText}>
            KK（美团视频极速版）当前保有用户2600万，DAU仅400万，超过84%的保有用户对现有签到、打卡等常规激励已脱敏，处于{"\u201c"}装了不打开{"\u201d"}的沉默状态。
          </p>
          <p style={bodyText}>
            需要探索以桌面组件为核心场域的新活动玩法，用差异化的游戏化体验重新激活这批安卓下沉用户。
          </p>
        </HorizontalSection>

        {/* ========== 痛点分析 ========== */}
        <HorizontalSection title="痛点分析">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px'
          }}>
            <PainPointCard
              title="活动玩法同质化"
              content={"签到、打卡、宝箱等常规激励揭奖形式已被行业用尽，用户产生\u201c套路感\u201d防御，参与意愿持续走低"}
            />
            <PainPointCard
              title="单次激励无粘性"
              content={"现有活动\u201c领完即走\u201d，缺乏跨天回访的结构性动力，单次触达无法转化为持续活跃"}
            />
            <PainPointCard
              title="低活人群阈值高"
              content={"对已沉默用户而言，\u201c统一发放\u201d的激励策略对高活和低活用户无差别，撬动效率极低"}
            />
          </div>
        </HorizontalSection>

        {/* ========== 设计过程 ========== */}
        <HorizontalSection title="设计过程">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
            marginBottom: '32px'
          }}>
            <ProcessCard
              step="01"
              title="数据验证"
              items={[
                '拉取KK近6个月活动参与漏斗数据',
                '常规签到/打卡活动参与率持续走低',
                '桌面组件次日回访率远低于APP内入口'
              ]}
            />
            <ProcessCard
              step="02"
              title="竞品调研"
              items={[
                '拆解拼多多/抖音极速版/淘宝特价版激励玩法',
                '刮刮卡/翻卡类玩法参与完成率显著高于传统签到',
                '竞品均未将桌面组件作为独立激励渠道差异化运营'
              ]}
            />
            <ProcessCard
              step="03"
              title="用户洞察"
              items={[
                '访谈低活安卓用户，核心反馈：对确定性小额奖励无感',
                '对不确定结果的好奇心 > 对确定小额的动力',
                '下沉用户更偏好有物理操作反馈的交互形式'
              ]}
            />
          </div>
          <HighlightBox>
            关键洞察：问题不在于奖励金额不够大，而在于揭奖体验缺乏惊喜感和参与感。用户需要的是一个"值得期待的过程"，而非一个"可以预判的结果"。
          </HighlightBox>
        </HorizontalSection>

        {/* ========== 设计目标 ========== */}
        <HorizontalSection title="设计目标">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px'
          }}>
            <GoalCard label="核心指标" value="KK DAU +1.5%" />
            <GoalCard label="渠道指标" value="桌面组件渗透率提升" />
            <GoalCard label="成本约束" value="总运营成本不增加" />
          </div>
        </HorizontalSection>

        {/* ========== 设计策略 ========== */}
        <HorizontalSection title="设计策略">
          <p style={{ ...bodyText, marginBottom: '32px' }}>
            从三个核心痛点出发，推导出对应的设计策略方向：
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px'
          }}>
            <StrategyMapping painPoint="活动玩法同质化" strategy="激励体验重构" />
            <StrategyMapping painPoint="单次激励无粘性" strategy="桌面组件参与" />
            <StrategyMapping painPoint="低活人群阈值高" strategy="品牌心智建设" />
          </div>
        </HorizontalSection>

        {/* ========== 设计方案 ========== */}
        <DesignPlanSection />

        {/* ========== AI实践 ========== */}
        <div style={{
          background: '#111111',
          color: '#ffffff',
          borderRadius: '20px',
          padding: '60px 48px',
          marginTop: '60px',
          marginBottom: '60px'
        }}>
          <h3 style={{
            fontSize: '28px',
            fontWeight: '600',
            marginBottom: '8px'
          }}>
            AI实践
          </h3>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '48px'
          }}>
            coding潮初期的探索
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px'
          }}>
            <AICard category="动效设计" details={['HTML', '美团MRN']} />
            <AICard category="vibecoding" details={['skill封装', '时间轴调试工具']} />
            <AICard category="代码合并" details={['不需要验收']} />
            <AICard category="整体提效" details={[]} />
          </div>
        </div>

        {/* ========== 项目成果 ========== */}
        <SectionBlock title="项目成果">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px'
          }}>
            <ResultCard value="+1.5%" metric="KK DAU增长" desc="A/B实验验证，达成目标后全量上线" />
            <ResultCard value="两次访问" metric="行为链条" desc="报名贡献当日活跃，领奖贡献次日回访" />
            <ResultCard value="渗透率提升" metric="桌面组件" desc="差异化翻倍权益驱动组件报名" />
            <ResultCard value="总池固定" metric="运营成本" desc="瓜分模式翻倍为份额再分配，总支出不变" />
          </div>
        </SectionBlock>

        {/* ========== 经验沉淀 ========== */}
        <SectionBlock title="经验沉淀">
          <ReflectionItem
            title="延迟满足型活动的游戏化设计方法论"
            content={"当奖励需要等待时，核心不是\u201c告诉用户等多久\u201d，而是\u201c让等待本身变成期待\u201d。手法：前置权益锚定（种期待）\u2192隔夜信息缺口（养悬念）\u2192仪式感揭示+二次惊喜叠加（爆惊喜）。可复用至所有\u201c非即时兑现\u201d的激励活动设计。"}
          />
          <ReflectionItem
            title={"\u201c活跃度反向匹配倍数\u201d的人群策略模型"}
            content={"对越不活跃的用户给予越高专属权益倍数，精准撬动目标人群，避免对高活用户过度补贴。在瓜分模式下翻倍为池内份额再分配、总成本不变。可抽象为通用的\u201c人群\u00d7权益\u00d7成本\u201d配置框架。"}
          />
          <ReflectionItem
            title="下沉用户的游戏化交互偏好洞察"
            content={"下沉用户对\u201c手指操作可见变化\u201d的交互形式（刮、拆、翻、转）的参与度显著高于\u201c点按确认\u201d的静态形式。可复用至后续所有面向保有低活用户的激励活动设计，指导交互形式选择。"}
          />
        </SectionBlock>
      </main>
    </div>
  );
}

// ========== 样式常量 ==========
const bodyText: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '2',
  color: 'rgba(0, 0, 0, 0.6)',
  fontWeight: '300',
  marginBottom: '16px'
};


// ========== 组件 ==========

// 水平布局 Section（左标题 + 右内容）
function HorizontalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      gap: '48px',
      marginBottom: '72px',
      paddingBottom: '72px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
    }}>
      <div>
        <h3 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#c0538a',
          letterSpacing: '1px'
        }}>
          {title}
        </h3>
      </div>
      <div>{children}</div>
    </div>
  );
}

// 通用 Section
function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '60px' }}>
      <h3 style={{
        fontSize: '12px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'rgba(0, 0, 0, 0.35)',
        fontWeight: '400',
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

// 目标卡片
function GoalCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      padding: '24px',
      borderRadius: '12px',
      background: 'rgba(0, 0, 0, 0.02)',
      border: '1px solid rgba(0, 0, 0, 0.06)',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '11px',
        color: 'rgba(0, 0, 0, 0.35)',
        letterSpacing: '1px',
        marginBottom: '10px',
        textTransform: 'uppercase'
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '16px',
        fontWeight: '600',
        color: '#1d1d1f'
      }}>
        {value}
      </div>
    </div>
  );
}

// 设计过程卡片
function ProcessCard({ step, title, items }: { step: string; title: string; items: string[] }) {
  return (
    <div>
      <div style={{
        fontSize: '11px',
        color: 'rgba(0, 0, 0, 0.25)',
        fontFamily: 'monospace',
        marginBottom: '8px'
      }}>
        {step}
      </div>
      <h4 style={{
        fontSize: '16px',
        fontWeight: '600',
        color: '#1d1d1f',
        marginBottom: '16px'
      }}>
        {title}
      </h4>
      {items.map((item, i) => (
        <p key={i} style={{
          fontSize: '13px',
          lineHeight: '1.8',
          color: 'rgba(0, 0, 0, 0.55)',
          fontWeight: '300',
          marginBottom: '8px',
          paddingLeft: '12px',
          borderLeft: '2px solid rgba(0, 0, 0, 0.06)'
        }}>
          {item}
        </p>
      ))}
    </div>
  );
}

// 痛点卡片
function PainPointCard({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h4 style={{
        fontSize: '16px',
        fontWeight: '500',
        color: '#8b7355',
        marginBottom: '16px',
        fontStyle: 'italic'
      }}>
        {title}
      </h4>
      <p style={{
        fontSize: '13px',
        lineHeight: '1.8',
        color: 'rgba(0, 0, 0, 0.55)',
        fontWeight: '300'
      }}>
        {content}
      </p>
    </div>
  );
}

// 策略映射
function StrategyMapping({ painPoint, strategy }: { painPoint: string; strategy: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: '14px',
        color: '#8b7355',
        fontWeight: '500',
        marginBottom: '16px'
      }}>
        {painPoint}
      </div>
      <div style={{
        width: '1px',
        height: '24px',
        background: 'rgba(0,0,0,0.15)',
        margin: '0 auto 16px'
      }} />
      <div style={{
        fontSize: '15px',
        fontWeight: '600',
        color: '#1d1d1f'
      }}>
        {strategy}
      </div>
    </div>
  );
}

// 设计方案 Section（核心内容）
function DesignPlanSection() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      gap: '48px',
      marginBottom: '72px',
      paddingBottom: '72px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
    }}>
      {/* 左侧标题 */}
      <div>
        <h3 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#c0538a',
          letterSpacing: '1px',
          marginBottom: '4px'
        }}>
          设计方案
        </h3>
        <span style={{
          fontSize: '12px',
          color: 'rgba(0, 0, 0, 0.35)',
          fontFamily: 'monospace'
        }}>
          Design plan
        </span>
      </div>

      {/* 右侧内容 */}
      <div>
        {/* Tab 导航 */}
        <div style={{
          display: 'flex',
          gap: '48px',
          marginBottom: '56px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          paddingBottom: '16px'
        }}>
          <TabLabel label="激励体验重构" active={true} />
          <TabLabel label="桌面组件参与" active={false} />
          <TabLabel label="品牌心智建设" active={false} />
        </div>

        {/* === 激励体验重构 === */}
        <PlanBlock label="激励体验重构">
          <SubSection heading="刮刮乐玩法">
            <p style={bodyText}>
              以刮刮乐为核心交互载体，通过手指操作与可见变化的物理隐喻，将确定性的瓜分结果包装为主动揭示的惊喜体验。用户并非被动接收分配金额，而是亲手参与揭示过程，结果相同但主观价值感显著提升。
            </p>
            <p style={bodyText}>
              背后依托三个行为心理学机制：变动比率强化制造奖励的不可预测性，产生最强的行为持续性；IKEA效应提升用户对亲手揭示结果的价值认同；峰终定律确保刮开瞬间与收尾时刻形成双正向锚点。
            </p>
            <HighlightBox>
              行业数据验证：JETIR 2024研究显示刮刮卡比现金返还积分展现出更高的用户参与潜力；游戏化揭奖机制可使月活增长62%、月互动量提升71%（dacadoo实践数据）。
            </HighlightBox>
          </SubSection>

          <SubSection heading="倍率模式">
            <p style={bodyText}>
              桌面组件的核心差异化价值在于翻倍权益，最高可达15倍。将权益感知从"领奖时才知道"前移至报名成功瞬间——用户从桌面报名后立刻看到倍数卡揭示。利用禀赋效应，一旦用户感知到已经拥有高倍加成，未来领奖即等同于失去已有权益，损失厌恶所产生的驱动力是正向激励的2至2.5倍（Kahneman & Tversky前景理论）。
            </p>
            <p style={bodyText}>
              人群反向匹配策略：越不活跃的用户给予越高倍数。流失/回流用户15倍→新用户/低活老用户10倍→中活老用户5-8倍→高活老用户2倍。精妙之处在于成本结构：瓜分模式下总奖池固定，翻倍本质是池内份额再分配，平台总支出不变。
            </p>
          </SubSection>
        </PlanBlock>

        {/* === 桌面组件参与 === */}
        <PlanBlock label="桌面组件参与">
          <SubSection heading="次日开奖连续参与">
            <p style={bodyText}>
              当日报名、次日瓜分的延迟满足结构将单次活动自然拆为两次访问，同时服务DAU与次留双指标。
            </p>
            <p style={bodyText}>
              情绪节奏三段式推进：报名成功配合倍数卡揭示种下期待，桌面组件状态切换与持续提醒维持跨夜悬念，次日刮奖叠加翻倍升级动画形成双峰体验。报名贡献当日活跃，领奖贡献次日回访，等待本身不是流失成本，而是被设计过的驱动力。
            </p>
          </SubSection>

          <SubSection heading="建立桌面组件权益心智">
            <p style={bodyText}>
              桌面组件与APP内入口并存，需要差异化价值支撑用户保留组件的理由。策略是将翻倍权益设定为桌面渠道独占，非桌面入口报名无法获得倍数加成。
            </p>
            <p style={bodyText}>
              同时在组件视觉上持续外露倍数状态与活动进度，让用户每次看到桌面都被提醒"这里有你的专属权益"，从工具性入口转变为权益归属感的载体。
            </p>
          </SubSection>
        </PlanBlock>

        {/* === 品牌心智建设 === */}
        <PlanBlock label="品牌心智建设">
          <SubSection heading="谐音辅助理解">
            <p style={bodyText}>
              将"刮刮乐"转译为"呱呱乐"，配合青蛙IP形成KK专属活动符号。"呱呱"与"刮刮"谐音，动作隐喻直觉化，零学习成本。粉色青蛙+圆润设计语言匹配下沉用户偏好，降低"激励活动=套路"的防御心理。IP支持节日换装、特殊皮肤、成就体系等长线扩展，避免每次迭代从零建立认知。
            </p>
          </SubSection>

          <SubSection heading="动效延展">
            <p style={bodyText}>
              为青蛙IP设计贯穿全流程的表情动效系统：报名成功兴奋跳跃确认正反馈，跨夜等待打瞌睡到睁眼拟人化替代冷数字倒计时，刮奖揭示表情随金额梯度变化将数值结果转化为情绪叙事。
            </p>
            <p style={bodyText}>
              下沉用户对"角色有反应"的感知强于"界面有动画"，情感化动效比功能性动效更能打破防御心理。
            </p>
          </SubSection>
        </PlanBlock>
      </div>
    </div>
  );
}

// Tab 标签
function TabLabel({ label, active }: { label: string; active: boolean }) {
  return (
    <span style={{
      fontSize: '14px',
      fontWeight: active ? '600' : '400',
      color: active ? '#8b7355' : 'rgba(0, 0, 0, 0.4)',
      cursor: 'pointer',
      letterSpacing: '0.5px'
    }}>
      {label}
    </span>
  );
}

// 方案块
function PlanBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '56px' }}>
      <div style={{
        fontSize: '13px',
        fontWeight: '600',
        color: '#8b7355',
        marginBottom: '24px',
        letterSpacing: '1px'
      }}>
        {label}
      </div>
      {children}
    </div>
  );
}

// 子章节
function SubSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '36px' }}>
      <h4 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#1d1d1f',
        marginBottom: '14px'
      }}>
        {heading}
      </h4>
      {children}
    </div>
  );
}

// 高亮框
function HighlightBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(139, 115, 85, 0.05)',
      borderLeft: '3px solid #8b7355',
      padding: '16px 20px',
      borderRadius: '0 8px 8px 0',
      marginTop: '12px',
      marginBottom: '20px'
    }}>
      <p style={{
        fontSize: '13px',
        lineHeight: '1.8',
        color: 'rgba(0, 0, 0, 0.55)',
        fontWeight: '300',
        margin: 0
      }}>
        {children}
      </p>
    </div>
  );
}

// AI 卡片
function AICard({ category, details }: { category: string; details: string[] }) {
  return (
    <div>
      <div style={{
        fontSize: '15px',
        fontWeight: '500',
        color: '#ffffff',
        marginBottom: '16px'
      }}>
        {category}
      </div>
      {details.map((d, i) => (
        <div key={i} style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: '1.8'
        }}>
          {d}
        </div>
      ))}
    </div>
  );
}

// 成果卡片
function ResultCard({ value, metric, desc }: { value: string; metric: string; desc: string }) {
  return (
    <div style={{
      padding: '24px',
      borderRadius: '12px',
      background: 'rgba(0, 0, 0, 0.02)',
      border: '1px solid rgba(0, 0, 0, 0.06)'
    }}>
      <div style={{
        fontSize: '20px',
        fontWeight: '500',
        color: '#1d1d1f',
        marginBottom: '6px'
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '13px',
        color: 'rgba(0, 0, 0, 0.6)',
        marginBottom: '4px',
        fontWeight: '500'
      }}>
        {metric}
      </div>
      <div style={{
        fontSize: '12px',
        color: 'rgba(0, 0, 0, 0.35)'
      }}>
        {desc}
      </div>
    </div>
  );
}

// 经验沉淀条目
function ReflectionItem({ title, content }: { title: string; content: string }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <h4 style={{
        fontSize: '15px',
        fontWeight: '500',
        color: '#1d1d1f',
        marginBottom: '8px'
      }}>
        {title}
      </h4>
      <p style={bodyText}>{content}</p>
    </div>
  );
}
