import classNames from 'classnames/bind';
import styles from './DetailTab.module.scss';
import { forwardRef, useId } from 'react';
import Input from '~/components/Input';
import { Link } from 'react-router-dom';

import { LuImagePlus } from 'react-icons/lu';
import Video from '~/components/Video';

const cx = classNames.bind(styles);

const DetailTab = forwardRef(({}, ref) => {
   const uniqueID = useId();
   const handleChangeFile = () => {};
   return (
      <div className={cx('wrapper')}>
         <h2 className={cx('header')}>Chi tiết</h2>
         <div className={cx('inner')}>
            <div className={cx('inner-left')}>
               <div className={cx('inner-left_content')}>
                  <div className={cx('content-row')}>
                     <Input key="name1" maxRow={2} row={2} title="Tiêu đề" placeholder="Thêm tiêu đề của bạn" required maxLength={136}></Input>
                  </div>

                  <div className={cx('content-row')}>
                     <Input key="description1" maxRow={4} row={4} title="Mô tả" placeholder="Thêm mô tả cho người xem" maxLength={6139}></Input>
                  </div>

                  <div className={cx('content-row')}>
                     <Input key="name1" maxRow={1} row={1} title="Tập phim" placeholder="Tập phim cần thêm" required maxLength={96}></Input>
                  </div>

                  <div className={cx('content-row')}>
                     <div className={cx('content-row_title')}>Hình thu nhỏ</div>
                     <div className={cx('content-row_description')}>
                        Chọn hoặc tải một hình ảnh lên để thể hiện nội dung trong video của bạn. <Link>Tìm hiểu thêm</Link>
                     </div>

                     <div className={cx('content-row_thumnails-list')}>
                        <div onClick={() => {}} className={cx('content-row_thumnails-item_create')}>
                           <input onChange={handleChangeFile} type="file" style={{ display: 'none' }} accept="image/png, image/gif, image/jpeg" />
                           <div className={cx('content-row_thumnails-item_create-icon')}>
                              <LuImagePlus />
                           </div>
                           <div className={cx('content-row_thumnails-item_create-title')}>Tải hình thu nhỏ lên</div>
                        </div>
                        <div className={cx('content-row_thumnails-item', 'content-row_thumnails-item_activ')}>
                           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq5D2o1F9Uf3L0BvK7kMOUdgzfgoxML2DenhpWSFZAzA&s" alt="" />
                        </div>
                        <div className={cx('content-row_thumnails-item')}>
                           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq5D2o1F9Uf3L0BvK7kMOUdgzfgoxML2DenhpWSFZAzA&s" alt="" />
                        </div>
                        <div className={cx('content-row_thumnails-item')}>
                           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq5D2o1F9Uf3L0BvK7kMOUdgzfgoxML2DenhpWSFZAzA&s" alt="" />
                        </div>
                     </div>
                  </div>

                  <div className={cx('content-row')}>
                     <div className={cx('content-row_title')}>Giới hạn độ tuổi</div>
                     <div className={cx('content-row_sub-title')}>Tập phim này có dành cho trẻ em không? (bắt buộc)</div>

                     <div className={cx('content-row_description')}>
                        Chọn hoặc tải một hình ảnh lên để thể hiện nội dung trong video của bạn. <Link>Tìm hiểu thêm</Link>
                     </div>

                     <div className={cx('content-row_radio-list')}>
                        <label className={cx('content-row_radio-item')}>
                           <input type="radio" value="" name="bound" />
                           <div>Có, nội dung này dành cho trẻ em</div>
                        </label>
                        <label className={cx('content-row_radio-item')}>
                           <input type="radio" value="" name="bound" />
                           <div>Không, nội dung này không dành cho trẻ em</div>
                        </label>
                     </div>
                  </div>
               </div>
            </div>
            <div className={cx('inner-right')}>
               <div className={cx('wrapper-video')}>
                  <div className={cx('inner-video')}>
                     <Video></Video>
                  </div>
                  <div className={cx('description-video')}></div>
               </div>
            </div>
         </div>
      </div>
   );
});

export default DetailTab;
