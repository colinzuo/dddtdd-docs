import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '最佳实践',
    description: (
      <>
        学习业界最佳实践，整理相关文档
      </>
    ),
  },
  {
    title: '可复现',
    description: (
      <>
        尽量给出详细的命令，尽量使用docker来操作，从而容易复现。
      </>
    ),
  },
  {
    title: '高覆盖',
    description: (
      <>
        对前端，后端，云开发，中间件等各方面都进行覆盖。
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
