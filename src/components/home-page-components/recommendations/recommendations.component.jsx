
import TrackList from '../../reusable-components/track-list/track-list.component'

import Spinner from '../../reusable-components/spinner/spinner.component'

import { RecommendationsContainer } from './recommendations.styles'

const Recommendations = ({tracks, onAdd, searchLoading}) => {
        return (
            <RecommendationsContainer>
              <h2>Recommendations</h2>
              <Spinner searchLoading={searchLoading} />
              <TrackList 
                 tracks={tracks} 
                 onAdd={onAdd}
                 trackType={'recommendations'}/> 
            </RecommendationsContainer>
        )
}

export default Recommendations