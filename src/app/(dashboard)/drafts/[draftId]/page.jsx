/**
 * Drafts page with id slug top level component
 */

import Drafts from '@/components/Dashboard/Drafts';

export default async function EditDraftPage({ params }) {
  const { draftId } = await params;
  
  return (
    <Drafts draftId={draftId} />
  );
} 