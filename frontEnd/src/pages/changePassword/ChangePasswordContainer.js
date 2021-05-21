import { connect } from 'react-redux'
import { changePassword } from '../../redux/action/changePasswordAction'
import ChangePassword from './ChangePassword'


const mapStoreToProps = state => ({
    loading: state.profile.loading
})

const mapDispatchToProps = dispatch => ({
    changePassword: (data) => dispatch(changePassword(data))
})

export default connect(mapStoreToProps, mapDispatchToProps)(ChangePassword)