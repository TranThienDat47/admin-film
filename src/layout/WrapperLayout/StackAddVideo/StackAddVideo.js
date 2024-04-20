import classNames from 'classnames/bind';
import styles from './StackAddVideo.module.scss';
import { createRef, useContext, useEffect, useRef, useState } from 'react';
import CreateEpisodes from '~/views/components/CreateEpisodes';
import { GlobalContext } from '~/contexts/global';

const cx = classNames.bind(styles);
const MAX_LENGTH_TASK = 1000;

function StackAddVideo({ tempData = {} }) {
   const {
      globalState: { showCreateEpisodesState, dataTempCreateEpisodesState },
      setShowCreateEpisodes,
   } = useContext(GlobalContext);

   const [tempDataState, setTempDataState] = useState(tempData);

   const [confirmUnload, setConfirmUnload] = useState(false);

   const [showState, setShowState] = useState(false);
   const [stackVideoState, setStackVideoState] = useState([
      {
         hidden: true,
         data: {},
         isNew: true,
      },
   ]);

   const createEpisodesRefs = useRef(new Array(MAX_LENGTH_TASK).fill(0).map(() => createRef()));
   const wrapperRef = useRef(null);

   useEffect(() => {
      if (showCreateEpisodesState) {
         setStackVideoState((prev) =>
            prev.map((element, index) => {
               if (index + 1 === prev.length) {
                  return { ...element, hidden: false };
               } else {
                  return element;
               }
            }),
         );
      } else {
         setStackVideoState((prev) =>
            prev.map((element, index) => {
               if (index + 1 === prev.length) {
                  return { ...element, hidden: true };
               } else {
                  return element;
               }
            }),
         );
      }

      if (stackVideoState.length > 1) {
         wrapperRef.current.style.width = 'auto';
         wrapperRef.current.style.height = 'auto';
      }
   }, [showCreateEpisodesState]);

   useEffect(() => {
      const handleBeforeUnload = (event) => {
         if (confirmUnload) {
            return (event.returnValue = '');
         }
      };

      // Prompt confirmation when reload page is triggered
      window.onbeforeunload = handleBeforeUnload;

      // Unmount the window.onbeforeunload event
      return () => {
         window.onbeforeunload = null;
      };
   }, [confirmUnload]);

   useEffect(() => {}, [tempDataState]);

   return (
      <>
         <div ref={wrapperRef} className={cx('wrapper')}>
            <div className={cx('header')}>Đang thực hiện</div>
            <div className={cx('list')}>
               {stackVideoState.map((element, index) => (
                  <div
                     style={{
                        height: `${index + 1 === stackVideoState.length ? '0' : '40px'}`,
                        padding: `${index + 1 === stackVideoState.length ? '0' : ''}`,
                     }}
                     className={cx('item')}
                     key={index}
                     onClick={(e) => {
                        setStackVideoState((prev) =>
                           prev.map((elementPrev, indexPrev) => {
                              if (indexPrev === index) {
                                 return { ...elementPrev, hidden: false };
                              } else {
                                 return elementPrev;
                              }
                           }),
                        );
                     }}
                  >
                     <CreateEpisodes
                        ref={createEpisodesRefs.current[index]}
                        hidden={element.hidden}
                        handleLoadVideo={() => {
                           setConfirmUnload(true);
                        }}
                        handleLoadSuccessVideo={() => {
                           setConfirmUnload(false);
                        }}
                        handleClose={(e) => {
                           e.preventDefault();
                           e.stopPropagation();

                           setShowCreateEpisodes(false);

                           if (createEpisodesRefs.current[index].current && createEpisodesRefs.current[index].current.getStateHandleEvent()) {
                              if (stackVideoState.length <= MAX_LENGTH_TASK) {
                                 setStackVideoState((prev) => {
                                    if (prev.find((element, indexTemp) => indexTemp === index).isNew) {
                                       return prev
                                          .map((elementPrev) => {
                                             if (!elementPrev.hidden) {
                                                return { ...elementPrev, hidden: true, isNew: false };
                                             } else {
                                                return { ...elementPrev, isNew: false };
                                             }
                                          })
                                          .concat({ hidden: true, data: {}, isNew: true });
                                    } else {
                                       return prev.map((elementPrev) => {
                                          if (!elementPrev.hidden) {
                                             return { ...elementPrev, hidden: true };
                                          } else {
                                             return elementPrev;
                                          }
                                       });
                                    }
                                 });
                              }
                           } else {
                              setStackVideoState((prev) =>
                                 prev.map((elementPrev) => {
                                    if (!elementPrev.hidden) {
                                       return { ...elementPrev, hidden: true };
                                    } else {
                                       return elementPrev;
                                    }
                                 }),
                              );
                           }
                        }}
                     />
                  </div>
               ))}
            </div>
         </div>
      </>
   );
}

export default StackAddVideo;
