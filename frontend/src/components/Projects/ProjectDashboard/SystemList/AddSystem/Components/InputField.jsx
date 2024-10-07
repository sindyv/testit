import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function InputField({ register, label, onClickButton, id, selectData }) {
	return (
		<>
			<Form.Label className='mb-3 d-flex justify-content-between align-items-end'>
				{label}
				{onClickButton && (
					<Button
						size='sm'
						variant='outline-primary'
						onClick={onClickButton}
					>
						+
					</Button>
				)}
			</Form.Label>

			{selectData ? (
				<Form.Select {...register(`${id}`)}>
					{selectData.map((data) => {
						return (
							<option key={data.id} value={data.id}>
								{data.value}
							</option>
						)
					})}
				</Form.Select>
			) : (
				<Form.Control {...register(`${id}`)} id={id} />
			)}
		</>
	)
}

export default InputField
