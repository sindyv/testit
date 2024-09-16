const useCapitalizeFirstLetter = (word) => {
	word = word.toLowerCase().split(' ')
	word = word.map((item) => item[0].toUpperCase() + item.substr(1)).join(' ')

	return word
}

export default useCapitalizeFirstLetter
