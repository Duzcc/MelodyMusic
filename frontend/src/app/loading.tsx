import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.circle}>
        <div className={styles.iconContainer}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#gradLoading)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
            <defs>
              <linearGradient id="gradLoading" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stopColor="#c90076"/>
                <stop offset="100%" stopColor="#4a9eff"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <h2 className={styles.text}>Loading...</h2>
    </div>
  );
}
