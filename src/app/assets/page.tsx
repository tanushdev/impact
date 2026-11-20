import { redirect } from 'next/navigation';

export default function AssetsPage() {
  // As requested: No standalone page for assets, redirect to first asset
  redirect('/assets/orange-basin-deep');
}
