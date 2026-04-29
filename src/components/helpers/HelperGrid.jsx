import HelperCard   from './HelperCard'
import SkeletonCard from '@components/common/SkeletonCard'
import EmptyState   from '@components/common/EmptyState'
import { MdSearchOff } from 'react-icons/md'

export default function HelperGrid({ helpers = [], loading = false, onShortlist }) {
  if (!loading && helpers.length === 0) {
    return (
      <EmptyState
        icon={MdSearchOff}
        title="No helpers found"
        description="Try adjusting your filters or search terms to see more results."
      />
    )
  }

  return (
    <div className="grid grid-auto-fill gap-5">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        : helpers.map((helper) => (
            <HelperCard key={helper.id} helper={helper} onShortlist={onShortlist} />
          ))
      }
    </div>
  )
}
