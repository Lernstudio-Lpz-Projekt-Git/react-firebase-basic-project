import React, { FC } from 'react';
import styles from './Admin.module.scss';

interface AdminProps {}

const Admin: FC<AdminProps> = () => (
  <div className={styles.Admin}>
    Admin Component
  </div>
);

export default Admin;
