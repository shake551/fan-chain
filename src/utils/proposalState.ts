import { ProposalState } from '@thirdweb-dev/sdk'

export function ProposalStateName(state: number) {
  switch (state) {
    case ProposalState.Active:
      return 'Active'
    case ProposalState.Pending:
      return 'Pending'
    case ProposalState.Queued:
      return 'Queued'
    case ProposalState.Expired:
      return 'Expired'
    case ProposalState.Canceled:
      return 'Canceled'
    case ProposalState.Defeated:
      return 'Defeated'
    case ProposalState.Executed:
      return 'Executed'
    case ProposalState.Succeeded:
      return 'Succeeded'
  }
}
