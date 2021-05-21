import { connect } from 'react-redux'
import { getInfo, updateProfile } from '../../redux/action/userProfileAction'
import UserInfo from './UserInfo'


const mapStoreToProps = state => ({
    loading: state.profile.loading,
    info: state.profile.label
})

const mapDispatchToProps = dispatch => ({
    getInfo: () => dispatch(getInfo()),
    updateProfile: (data) => dispatch(updateProfile(data))
})

export default connect(mapStoreToProps, mapDispatchToProps)(UserInfo)