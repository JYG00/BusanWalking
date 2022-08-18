import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styles from '../header.module.css';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

interface SearchFormProps {
  isDisplay: number;
}
interface SearchFormState {
  search_key: string;
  search_style: Object;
}

const onSearchStyle = { display: 'block', boxShadow: 'rgba(0, 0, 0, 0.8) 0 0 0 9999px', zIndex: '100' };

const offSearchStyle = { display: 'none', boxShadow: 'none', zIndex: '-1' };

export default function SearchForm(props: SearchFormProps) {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchRef = React.createRef<HTMLDivElement>();
  const [state, setState] = useState<SearchFormState>({ search_key: '', search_style: offSearchStyle });

  useEffect(() => {
    if (props.isDisplay > 0) {
      setState({ ...state, search_style: onSearchStyle });
    } else {
      setState({ ...state, search_style: offSearchStyle });
    }
  }, [props.isDisplay]);

  return (
    <div className={styles.head_search} ref={searchRef} style={state.search_style}>
      <div>
        <div>
          <div>
            <form
              onSubmit={(event: FormEvent) => {
                event.preventDefault();
                navigate('/search', { state: state.search_key });
                if (searchInputRef.current !== null) {
                  searchInputRef.current.value = '';
                  setState({ ...state, search_style: offSearchStyle });
                }
              }}
            >
              <input
                type="text"
                placeholder="검색할 내용을 입력해주세요. (예:부산 서구"
                ref={searchInputRef}
                onChange={(e) => {
                  setState({ ...state, search_key: e.target.value });
                }}
              />
              <button type="submit">
                <BiSearch />
              </button>
            </form>
          </div>
          <div>
            {/* 검색창 닫기 아이콘 */}
            <div
              onClick={() => {
                setState({ ...state, search_style: offSearchStyle });
              }}
            >
              <button className={styles.search_icon}>
                <FiPlus style={{ transform: 'rotate(45deg)' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
