import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './search.module.css';

export default function Search() {
  const location = useLocation();

  const [key, setKey] = useState<string>();

  useEffect(() => {
    console.log(location.state);
  }, [location]);

  return (
    <div className={styles.container}>
      {/* 슬로건 바 */}
      <div>Search page</div>
    </div>
  );
}
