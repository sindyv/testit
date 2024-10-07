import SysLocModal from './SysLocModal'
import SysCodeModal from './SysCodeModal'

function Modals({
	showSysLocModal,
	setShowSysLocModal,
	showSysNumModal,
	setShowSysNumModal,
}) {
	return (
		<>
			<SysLocModal
				show={showSysLocModal}
				onClose={() => setShowSysLocModal(false)}
			/>

			<SysCodeModal
				show={showSysNumModal}
				onClose={() => setShowSysNumModal(false)}
			/>
		</>
	)
}

export default Modals
