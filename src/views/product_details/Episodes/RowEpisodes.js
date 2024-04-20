import classNames from 'classnames/bind';
import style from './Episodes.module.scss';

import { MdPlaylistPlay } from 'react-icons/md';

import { LiaPencilAltSolid } from 'react-icons/lia';
import { RiFolderVideoLine } from 'react-icons/ri';
import { AiOutlineBarChart } from 'react-icons/ai';

import { BiCommentDetail } from 'react-icons/bi';

import { memo, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { converterDate, converterDateTitle } from '~/utils/validated';
import { GlobalContext } from '~/contexts/global';

const cx = classNames.bind(style);

function RowEpisodes({ dataRow = {}, isChecked = false, onCheckboxChange = () => {} }) {
   const {
      globalState: { showTempCreateEpisodesState },
      setShowTempCreateEpisodes,
      setDataTempCreateEpisodes,
   } = useContext(GlobalContext);

   const [showControlEpisodes, setShowControlEpisodes] = useState(false);
   const [isCheckedState, setIsCheckedState] = useState(isChecked);
   const rowRef = useRef(null);
   const episodesDescriptionRef = useRef(null);
   const episodesControlRef = useRef(null);
   const checkBoxRef = useRef(null);

   const handleShowControlEpisodes = () => {
      if (!showControlEpisodes) {
         episodesControlRef.current.style.display = 'flex';
         episodesDescriptionRef.current.style.display = 'none';
         setShowControlEpisodes(true);
      }
   };

   const handleHideControlEpisodes = () => {
      if (showControlEpisodes) {
         episodesControlRef.current.style.display = 'none';
         episodesDescriptionRef.current.style.display = 'block';
         setShowControlEpisodes(false);
      }
   };

   useEffect(() => {
      rowRef.current.onmousemove = () => {
         handleShowControlEpisodes();
      };

      rowRef.current.onmouseleave = () => {
         handleHideControlEpisodes();
      };

      // eslint-disable-next-line
   }, [showControlEpisodes]);

   useEffect(() => {
      setIsCheckedState(isChecked);
   }, [isChecked]);

   const formatTime = (inputTime) => {
      const date = new Date(inputTime);

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');

      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
   };

   const handleChoseItem = () => {
      setShowTempCreateEpisodes(true);
      setDataTempCreateEpisodes(dataRow);
   };

   return (
      <>
         <div ref={rowRef} className={cx('table-row')}>
            <div
               className={cx('table-col')}
               style={{
                  flex: '0 0 43px',
                  minWidth: '33px',
                  cursor: 'pointer',
               }}
               onClick={() => {
                  setIsCheckedState((prev) => !prev);
               }}
            >
               <input
                  ref={checkBoxRef}
                  type="checkbox"
                  style={{
                     cursor: 'pointer',
                  }}
                  checked={isCheckedState}
                  onChange={() => {}}
               />
            </div>
            <div className={cx('table-col')} style={{ flex: '3 0 219px', minWidth: '219px' }}>
               <div className={cx('episodes')}>
                  <div className={cx('episodes-left')}>
                     <div className={cx('wrapper-image-episodes')}>{<img src={dataRow} alt="" />}</div>
                  </div>
                  <div className={cx('episodes-right')}>
                     <div className={cx('episodes-right_name')}>
                        <Link onClick={handleChoseItem} nametooltip={'Chi tiết'}>
                           {dataRow.title}
                        </Link>
                     </div>

                     <div className={cx('episodes-right_description')} ref={episodesDescriptionRef}>
                        {dataRow.description.length > 0 ? dataRow.description : 'Thêm nội dung mô tả'}
                     </div>

                     <div className={cx('episodes-right_controls')} ref={episodesControlRef}>
                        <div className={cx('controls-icon')} nametooltip={'Chi tiết'}>
                           <div onClick={handleChoseItem}>
                              <LiaPencilAltSolid />
                           </div>
                        </div>
                        <div className={cx('controls-icon')} nametooltip={'Bình luận'}>
                           <BiCommentDetail />
                        </div>
                        <div className={cx('controls-icon')} nametooltip={'Số liệu phân tích'}>
                           <AiOutlineBarChart />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className={cx('table-col')} style={{ flex: '0.5 0 90px', minWidth: '90px' }}>
               <div className={cx('status')}>{dataRow._state}</div>
            </div>

            <div className={cx('table-col')} style={{ flex: '0.5 0 90px', minWidth: '90px' }}>
               <div className={cx('category')}>{dataRow.child_restriction}</div>
            </div>

            <div className={cx('table-col')} style={{ flex: '0.5 0 90px', minWidth: '90px' }}>
               <div className={cx('recent')}>{converterDateTitle(dataRow.createdAt)}</div>
            </div>

            <div className={cx('table-col')} style={{ flex: '0.5 0 90px', minWidth: '90px' }}>
               <div className={cx('')}>{dataRow.views}</div>
            </div>

            <div className={cx('table-col')} style={{ flex: '0.5 0 90px', minWidth: '90px' }}>
               <div className={cx('')}>{dataRow.count_comments}</div>
            </div>

            <div className={cx('table-col')} style={{ flex: '0.5 0 90px', minWidth: '90px' }}>
               <div className={cx('count_episodes')}>{dataRow.reacts}</div>
            </div>
         </div>
      </>
   );
}

export default memo(RowEpisodes);
