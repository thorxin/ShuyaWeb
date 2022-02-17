import { useEffect, useState } from 'react'
import { useStore } from 'react-redux'

export default function Hook() {
  const store = useStore()

  const [count, setCount] = useState(0)

  /**
   * life cycle
   */
  useEffect(() => {
    const temp_count = store.getState().notifications.notiCount

    if (temp_count > 0) setCount(temp_count)
  }, [store.getState().notifications.notiCount])

  return [count]
}
