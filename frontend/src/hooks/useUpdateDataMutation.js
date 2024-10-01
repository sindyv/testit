import { useQueryClient, useMutation } from "@tanstack/react-query"
function useUpdateDataMutation(mutationFn, onSuccessFn) {
	return useMutation({
		mutationFn: mutationFn,
		onSuccess: onSuccessFn,
	})
}

export default useUpdateDataMutation
