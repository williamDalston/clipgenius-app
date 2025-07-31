import React from 'react'

interface TabButtonProps {
  id: string
  icon: React.ElementType
  label: string
  active: boolean
  onClick: () => void
}

const TabButton: React.FC<TabButtonProps> = ({ id, icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
      active
        ? 'bg-blue-600 text-white shadow-lg'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    <Icon size={18} />
    <span>{label}</span>
  </button>
)

export default TabButton
