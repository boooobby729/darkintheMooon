'use client';

import NavBar from '../components/NavBar';

// 项目数据结构
interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  duration: string;
  tags: string[];
  overview: string;
  background: string;
  strategies: {
    title: string;
    description: string;
  }[];
  highlights: {
    title: string;
    content: string;
  }[];
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  reflection: string;
}

// 呱呱乐项目数据
const projects: ProjectData[] = [
  {
    id: 'guaguale-8090',
    title: '呱呱乐 8090',
    subtitle: '外卖神券节 S 级营销活动 - 互动游戏化体验设计',
    role: '产品体验设计师',
    duration: '2024',
    tags: ['营销活动', '游戏化设计', 'AIGC提效', 'S级项目'],
    overview: '呱呱乐是美团外卖神券节的核心S级营销互动，以刮刮卡为基础玩法，通过游戏化体验驱动用户参与、提升券的领取率和核销率。项目面对的核心挑战是：用户对常规营销互动审美疲劳、参与动力不足，需要在保证商业目标的前提下，让用户"玩得开心、领得爽快"。',
    background: '神券节作为外卖最大规模的营销IP活动，面临用户参与度下降的挑战。用户对传统"点击领券"模式产生疲劳，需要通过新的互动形式重新激活参与热情。8090版本以80年代与90年代怀旧文化为主题，融合刮刮卡的经典玩法，打造沉浸式领券体验。',
    strategies: [
      {
        title: '策略一：降低参与门槛，让"手痒"驱动行为',
        description: '用户不需要理解复杂规则，看到刮刮卡就知道要"刮一刮"。将核心交互简化为最直觉的手势操作，通过视觉线索（银色涂层+文字提示）和触觉反馈（震动+音效）降低认知负荷。用户从看到到行动的路径缩短至1步。'
      },
      {
        title: '策略二：制造"开盲盒"期待感，用悬念维持参与',
        description: '每次刮开都是一次"拆惊喜"。借鉴盲盒/抽卡心理，通过遮罩机制天然制造悬念。刮动过程中逐渐露出的视觉元素（金色光晕、券的边角）持续制造多巴胺刺激，让用户产生"再来一张"的冲动。阶梯式奖励设计让每次结果都有惊喜感。'
      },
      {
        title: '策略三：打造8090怀旧氛围，让领券变成情感体验',
        description: '以80年代与90年代复古视觉为包装，将功能性的"领券"转化为情感化的"收集怀旧记忆"。通过像素风格动画、复古配色方案、经典游戏音效等元素，唤起目标用户群体的集体记忆，让互动过程本身成为值得分享的体验。'
      }
    ],
    highlights: [
      {
        title: 'AIGC 提效实践',
        content: '在视觉产出环节引入AIGC工具辅助设计。利用AI生成80/90年代风格的视觉素材（怀旧插画、像素元素、复古纹理），将原本需要3-5天的视觉探索阶段压缩至1天内完成多方案输出。AI负责风格发散和基础素材生产，设计师专注于品质把控、交互细节和整体体验叙事的打磨。实现了"效率与质量兼得"的工作模式。'
      },
      {
        title: '设计亮点',
        content: '交互动效方面：刮动时的粒子飘散效果、刮完后的奖品弹出动画、连续刮卡时的combo反馈，构建完整的正反馈循环。信息架构方面：首屏即玩法，减少一切前置说明页面；奖品领取后立即展示使用场景和倒计时，缩短从领取到核销的决策路径。'
      }
    ],
    results: [
      {
        metric: '券领取率',
        value: '提升 23%',
        description: '对比常规领券弹窗形式'
      },
      {
        metric: '用户参与时长',
        value: '平均 45s',
        description: '远超同类营销互动15s的行业均值'
      },
      {
        metric: '活动分享率',
        value: '提升 18%',
        description: '怀旧主题引发社交传播'
      },
      {
        metric: '设计效率',
        value: 'AIGC提效 60%',
        description: '视觉产出阶段耗时大幅缩减'
      }
    ],
    reflection: '呱呱乐项目验证了"游戏化思维+情感化设计"在营销场景的有效性。核心收获：一是简单玩法不等于简陋体验，极致打磨基础交互的细节反馈，比堆砌复杂功能更能打动用户；二是AIGC工具的价值不在于替代设计师，而在于将设计师从重复劳动中解放，让更多精力投入到体验策略和交互创新上；三是情感化包装能有效提升功能性行为的参与度——用户不是在"领券"，而是在"玩一个好玩的游戏"，顺便获得了优惠。'
  }
];

export default function ReadingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      color: '#ffffff',
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
          color: 'rgba(255, 255, 255, 0.4)',
          fontWeight: '300',
          marginBottom: '16px'
        }}>
          Portfolio
        </h1>
        <p style={{
          fontSize: '28px',
          fontWeight: '200',
          color: 'rgba(255, 255, 255, 0.9)',
          letterSpacing: '2px'
        }}>
          Design Works
        </p>
        <div style={{
          width: '40px',
          height: '1px',
          background: 'rgba(255, 255, 255, 0.3)',
          margin: '24px auto 0'
        }} />
      </header>

      {/* 项目列表 */}
      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 24px 120px'
      }}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </main>
    </div>
  );
}

// 项目卡片组件
function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  return (
    <article style={{
      marginBottom: '80px',
      opacity: 1,
      animation: `cardFadeIn 0.6s ease-out ${index * 0.2}s both`
    }}>
      {/* 项目头部 */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '12px',
          flexWrap: 'wrap'
        }}>
          <span style={{
            fontSize: '11px',
            letterSpacing: '2px',
            color: 'rgba(255, 255, 255, 0.4)',
            textTransform: 'uppercase'
          }}>
            {project.duration}
          </span>
          <span style={{
            fontSize: '11px',
            padding: '3px 10px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: 'rgba(255, 255, 255, 0.6)',
            letterSpacing: '1px'
          }}>
            {project.role}
          </span>
        </div>
        
        <h2 style={{
          fontSize: '24px',
          fontWeight: '300',
          color: '#ffffff',
          marginBottom: '8px',
          letterSpacing: '1px'
        }}>
          {project.title}
        </h2>
        
        <p style={{
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.5)',
          fontWeight: '300',
          lineHeight: '1.6'
        }}>
          {project.subtitle}
        </p>

        {/* 标签 */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginTop: '16px',
          flexWrap: 'wrap'
        }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '4px',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'rgba(255, 255, 255, 0.5)',
              letterSpacing: '0.5px'
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 分隔线 */}
      <div style={{
        width: '100%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
        margin: '32px 0'
      }} />

      {/* 项目概述 */}
      <Section title="项目概述">
        <p style={paragraphStyle}>{project.overview}</p>
      </Section>

      {/* 项目背景 */}
      <Section title="项目背景">
        <p style={paragraphStyle}>{project.background}</p>
      </Section>

      {/* 设计策略 */}
      <Section title="设计策略">
        {project.strategies.map((strategy, i) => (
          <div key={i} style={{ marginBottom: '24px' }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '8px'
            }}>
              {strategy.title}
            </h4>
            <p style={paragraphStyle}>{strategy.description}</p>
          </div>
        ))}
      </Section>

      {/* 亮点 */}
      <Section title="设计亮点">
        {project.highlights.map((highlight, i) => (
          <div key={i} style={{ marginBottom: '24px' }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '8px'
            }}>
              {highlight.title}
            </h4>
            <p style={paragraphStyle}>{highlight.content}</p>
          </div>
        ))}
      </Section>

      {/* 项目成果 */}
      <Section title="项目成果">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px'
        }}>
          {project.results.map((result, i) => (
            <div key={i} style={{
              padding: '20px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{
                fontSize: '20px',
                fontWeight: '300',
                color: '#ffffff',
                marginBottom: '4px'
              }}>
                {result.value}
              </div>
              <div style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '4px'
              }}>
                {result.metric}
              </div>
              <div style={{
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.35)'
              }}>
                {result.description}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 经验沉淀 */}
      <Section title="经验沉淀">
        <p style={paragraphStyle}>{project.reflection}</p>
      </Section>
    </article>
  );
}

// 段落样式
const paragraphStyle: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '2',
  color: 'rgba(255, 255, 255, 0.6)',
  fontWeight: '300'
};

// 章节组件
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '36px' }}>
      <h3 style={{
        fontSize: '12px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'rgba(255, 255, 255, 0.35)',
        fontWeight: '400',
        marginBottom: '16px',
        paddingBottom: '8px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}
