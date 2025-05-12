import React from 'react';
import { Pagination } from 'antd';

function PaginationComponent({ currentPage, total, onChange }) {
  return (
    <Pagination
      current={currentPage}
      pageSize={10}
      total={total}
      onChange={onChange}
      showSizeChanger={false}
    />
  );
}

export default PaginationComponent;
