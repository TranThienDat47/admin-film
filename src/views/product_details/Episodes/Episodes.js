import classNames from 'classnames/bind';
import style from './Episodes.module.scss';

import { MdFilterList, MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { FaRegCircleXmark } from 'react-icons/fa6';

import { MdArrowDropDown } from 'react-icons/md';

import { CgChevronLeft, CgChevronRight, CgPushChevronLeft, CgPushChevronRight } from 'react-icons/cg';

import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import RowEpisodes from './RowEpisodes';
import RipleAnimation from '~/components/RipleAnimation';
import { GlobalContext } from '~/contexts/global';
import Button from '~/components/Button';
import CreateEpisodes from '~/views/components/CreateEpisodes';

const cx = classNames.bind(style);

function Episodes() {
   const {
      globalState: { productDetailCurrent, loadingProductDetail, pageProductDetailCurrent, ableLoadingMoreProductDetail },
      getProductDetail,
      setShowCreateEpisodes,
   } = useContext(GlobalContext);

   const urlParams = new URLSearchParams(window.location.search);
   const product_id = urlParams.get('id');

   const wrapperRef = useRef(null);

   const searchInputRef = useRef(null);
   const checkBoxRef = useRef(null);

   const [isAllChecked, setAllChecked] = useState(false);

   const handleAllCheckboxChange = () => {
      setAllChecked(!isAllChecked);
   };

   useEffect(() => {
      getProductDetail(product_id).then(() => {});
   }, [product_id]);

   return (
      <>
         <div ref={wrapperRef} className={cx('wrapper')}>
            <div className={cx('inner')}>
               <div className={cx('main-content')}>
                  <div className={cx('main-content-top')}>
                     <div className={cx('main-content-top-left')}>
                        <h2 className={cx('header-title')}>Thông tin tập phim</h2>
                     </div>
                     <div className={cx('main-content-top-right')}>
                        <Button
                           onClick={() => {
                              setShowCreateEpisodes(true);
                           }}
                           key="save1"
                           primary
                           ripleAnimation
                           ripleAnimationLight
                           style={{ marginLeft: '9px' }}
                        >
                           Thêm tập phim
                        </Button>

                        <Button key="option1" transparent fullWidth style={{ width: `39px`, marginLeft: '9px' }}>
                           <HiOutlineDotsVertical />
                        </Button>
                     </div>
                  </div>
                  <div className={cx('main-content-bottom')}>
                     <div className={cx('filter')}>
                        <div
                           className={cx('filter-icon')}
                           onClick={() => {
                              searchInputRef.current.focus();
                           }}
                        >
                           <MdFilterList></MdFilterList>
                        </div>

                        <div className={cx('filter-list')}>
                           <div className={cx('filter-item')}>
                              <div className={cx('filter-item-title')} nametooltip={'Tiêu đề có chứa "a"'}>
                                 Tiêu đề: "ok la"
                              </div>
                              <div className={cx('filter-item-icon')} nametooltip={'Loại bỏ'}>
                                 <FaRegCircleXmark></FaRegCircleXmark>
                              </div>
                           </div>
                        </div>

                        <div className={cx('filter-main')}>
                           <input ref={searchInputRef} type="text" className={cx('txt_filter')} placeholder="Lọc" />
                        </div>
                     </div>
                     <div className={cx('main-content')}>
                        <div className={cx('table')}>
                           <div className={cx('table-header')}>
                              <div
                                 className={cx('table-col')}
                                 style={{
                                    flex: '0 0 56px',
                                    minWidth: '33px',
                                    cursor: 'pointer',
                                 }}
                                 onClick={() => {
                                    handleAllCheckboxChange();
                                 }}
                              >
                                 <input
                                    ref={checkBoxRef}
                                    type="checkbox"
                                    style={{
                                       cursor: 'pointer',
                                    }}
                                    checked={isAllChecked}
                                    onChange={() => {}}
                                 />
                              </div>
                              <div className={cx('table-col')} style={{ flex: '3 0 203px', minWidth: '203px' }}>
                                 Tập phim
                              </div>
                              <div className={cx('table-col')} style={{ flex: '0.5 0 90px', minWidth: '90px' }}>
                                 Chế độ hiển thị
                              </div>
                              <div className={cx('table-col')} style={{ flex: '0.5 0 90px', minWidth: '90px' }}>
                                 Quy định hạn chế
                              </div>
                              <div
                                 className={cx('table-col')}
                                 style={{
                                    flex: '0.5 0 90px',
                                    minWidth: '90px',
                                    color: 'var(--text-color)',
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                 }}
                              >
                                 Ngày
                                 <div className={cx('table-col-icon')}>
                                    <MdArrowUpward></MdArrowUpward>
                                 </div>
                              </div>
                              <div className={cx('table-col')} style={{ flex: '0.5 0 90px', minWidth: '90px' }}>
                                 Số lượt xem
                              </div>

                              <div className={cx('table-col')} style={{ flex: '0.5 0 90px', minWidth: '90px' }}>
                                 Số bình luận
                              </div>

                              <div className={cx('table-col')} style={{ flex: '0.5 0 90px', minWidth: '90px', display: 'flex', justifyContent: 'flex-end' }}>
                                 Lượt thích
                              </div>
                           </div>
                           <div className={cx('table-content')}>
                              {loadingProductDetail ||
                                 productDetailCurrent.map((element, index) => (
                                    <RowEpisodes dataRow={element} key={index} isChecked={isAllChecked} onCheckboxChange={handleAllCheckboxChange} />
                                 ))}
                           </div>
                        </div>

                        <div className={cx('footer-pagination')}>
                           <div className={cx('pagination-inner')}>
                              <span>Số hàng của mỗi trang</span>
                              <div className={cx('wrapper-combobox')}>
                                 <RipleAnimation
                                    style={{
                                       borderRadius: '9px',
                                    }}
                                 >
                                    <div className={cx('inner-combobox')}>
                                       <div className={cx('combobox-left')}>3</div>
                                       <div className={cx('combobox-right')}>
                                          <MdArrowDropDown></MdArrowDropDown>
                                       </div>
                                    </div>
                                 </RipleAnimation>
                                 <div className={cx('select-combobox')}>
                                    <div className={cx('select-combobox-item')}>10</div>
                                    <div className={cx('select-combobox-item')}>30</div>
                                    <div className={cx('select-combobox-item')}>50</div>
                                 </div>
                              </div>

                              <div className={cx('current-page')}>1 [4/4]</div>
                              <div className={cx('page-icon', 'first-page')}>
                                 <CgPushChevronLeft></CgPushChevronLeft>
                              </div>
                              <div className={cx('page-icon', 'prev-page')}>
                                 <CgChevronLeft></CgChevronLeft>
                              </div>
                              <div className={cx('page-icon', 'next-page')}>
                                 <CgChevronRight></CgChevronRight>
                              </div>
                              <div className={cx('page-icon', 'last-page')}>
                                 <CgPushChevronRight></CgPushChevronRight>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default Episodes;
