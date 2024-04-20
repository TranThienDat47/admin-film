import CreateEpisodes from '~/views/components/CreateEpisodes';
import StackAddVideo from './StackAddVideo/StackAddVideo';
import { useContext } from 'react';
import { GlobalContext } from '~/contexts/global';

function WrapperLayout({ children }) {
   const {
      globalState: { showTempCreateEpisodesState },
      setShowTempCreateEpisodes,
   } = useContext(GlobalContext);

   return (
      <>
         <StackAddVideo />
         <CreateEpisodes
            firstStep={1}
            handleClose={() => {
               setShowTempCreateEpisodes(false);
            }}
            hidden={!showTempCreateEpisodesState}
         />
         {children}
      </>
   );
}

export default WrapperLayout;
