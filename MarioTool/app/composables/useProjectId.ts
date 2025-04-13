export const useProjectId = () => {

  const werf = useState('werf')
  const form = useState('form')
  return computed(() => {
    return `${werf.value}_${form.value.name}`
  })

}
