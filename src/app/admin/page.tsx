import AdminDashboard from '@/components/admin/AdminDashboard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — THIS IS BALI', robots: 'noindex' }

export default function AdminPage() {
  return <AdminDashboard />
}
