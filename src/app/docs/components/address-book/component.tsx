import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit2, Image as ImageIcon, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface AddressEntry {
  id: string;
  name: string;
  address: string;
  ensName?: string;
  avatar?: string;
  notes?: string;
}

interface NewEntry {
  name: string;
  address: string;
  notes: string;
  avatar?: string;
}

interface AddressBookProps {
  entries: AddressEntry[];
  onAdd?: (entry: Omit<AddressEntry, 'id'>) => void;
  onEdit?: (entry: AddressEntry) => void;
  onDelete?: (id: string) => void;
  className?: string;
  variant?: 'default' | 'compact';
}

// Update the animation constants
const formAnimation = "animate-in slide-in-from-top-2 duration-300";
const listItemAnimation = "animate-in fade-in duration-200";
const iconButtonAnimation = "hover:scale-110 active:scale-95 transition-transform duration-200";
const deleteIconAnimation = "hover:scale-110 active:scale-95 transition-all duration-200 hover:rotate-12";
const textButtonAnimation = "transition-colors duration-200"; // New animation for text buttons

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
}

// Add address validation function
const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address) || address.toLowerCase().endsWith('.eth');
};

const DeleteConfirmationModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, name }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4 
        shadow-xl animate-in fade-in zoom-in duration-200`}>
        <div className="flex items-center space-x-3 text-red-500 mb-4">
          <AlertCircle className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Delete Address</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete <span className="font-medium text-gray-900 dark:text-white">{name}</span>? 
          This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 
              dark:hover:text-white ${textButtonAnimation}`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 
              ${textButtonAnimation}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const EditConfirmationModal: React.FC<EditModalProps> = ({ isOpen, onClose, onConfirm, name }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4 
        shadow-xl animate-in fade-in zoom-in duration-200`}>
        <div className="flex items-center space-x-3 text-blue-500 mb-4">
          <Edit2 className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Edit Address</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Save changes to <span className="font-medium text-gray-900 dark:text-white">{name}</span>?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 
              dark:hover:text-white ${textButtonAnimation}`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 
              ${textButtonAnimation}`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export const AddressBook: React.FC<AddressBookProps> = ({
  entries,
  onAdd,
  onEdit,
  onDelete,
  className = '',
  variant = 'default'
}) => {
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newEntry, setNewEntry] = useState<NewEntry>({
    name: '',
    address: '',
    notes: '',
    avatar: ''
  });
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string; name: string }>({
    isOpen: false,
    id: '',
    name: ''
  });
  const [editModal, setEditModal] = useState<{ isOpen: boolean; entry: NewEntry | null }>({
    isOpen: false,
    entry: null
  });
  const [addressError, setAddressError] = useState('');
  const [originalEntry, setOriginalEntry] = useState<NewEntry | null>(null);

  const filteredEntries = entries.filter(entry => 
    entry.name.toLowerCase().includes(search.toLowerCase()) ||
    entry.address.toLowerCase().includes(search.toLowerCase()) ||
    entry.ensName?.toLowerCase().includes(search.toLowerCase())
  );

  // Helper function to check if entry has been modified
  const hasChanges = (): boolean => {
    if (!originalEntry) return false;
    
    return (
      originalEntry.name !== newEntry.name ||
      originalEntry.address !== newEntry.address ||
      originalEntry.notes !== newEntry.notes ||
      originalEntry.avatar !== newEntry.avatar
    );
  };

  const handleSubmit = () => {
    if (!newEntry.name || !newEntry.address) return;
    
    // Validate address
    if (!isValidEthereumAddress(newEntry.address)) {
      setAddressError('Please enter a valid Ethereum address or ENS name');
      return;
    }

    if (editingId) {
      // Only show confirmation if changes were made
      if (hasChanges()) {
        setEditModal({ isOpen: true, entry: newEntry });
      } else {
        handleCancel(); // No changes, just close the form
      }
    } else {
      onAdd?.(newEntry);
      handleCancel();
    }
  };

  const handleDelete = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  const confirmDelete = () => {
    onDelete?.(deleteModal.id);
    setDeleteModal({ isOpen: false, id: '', name: '' });
  };

  const startEdit = (entry: AddressEntry) => {
    setIsAdding(true);
    setEditingId(entry.id);
    const newEntryData = {
      name: entry.name,
      address: entry.address,
      notes: entry.notes || '',
      avatar: entry.avatar || ''
    };
    setNewEntry(newEntryData);
    setOriginalEntry(newEntryData); // Store original entry for comparison
  };

  const handleCancel = () => {
    setNewEntry({ name: '', address: '', notes: '', avatar: '' });
    setIsAdding(false);
    setEditingId(null);
    setOriginalEntry(null); // Clear original entry
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEntry(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Confirm edit
  const confirmEdit = () => {
    if (editingId && editModal.entry) {
      onEdit?.({
        id: editingId,
        ...editModal.entry
      });
      handleCancel();
    }
    setEditModal({ isOpen: false, entry: null });
  };

  // Update address validation on change
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setNewEntry({ ...newEntry, address });
    
    if (address && !isValidEthereumAddress(address)) {
      setAddressError('Please enter a valid Ethereum address or ENS name');
    } else {
      setAddressError('');
    }
  };

  // Update the form input for address
  const renderAddressInput = () => (
    <div className="space-y-1">
      <input
        type="text"
        value={newEntry.address}
        onChange={handleAddressChange}
        placeholder="Address or ENS name"
        className={`w-full px-3 py-2 text-sm border rounded-lg
          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
          ${addressError ? 'border-red-500 dark:border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
      />
      {addressError && (
        <p className="text-xs text-red-500">{addressError}</p>
      )}
    </div>
  );

  if (variant === 'compact') {
    return (
      <>
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 w-full ${className}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Address Book</h2>
            <button
              onClick={() => {
                setIsAdding(true);
                setEditingId(null);
                setNewEntry({ name: '', address: '', notes: '', avatar: '' });
              }}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white 
                transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search addresses..."
              className="w-full px-3 py-2 pl-9 text-sm border border-gray-200 dark:border-gray-700 rounded-lg
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-500" />
          </div>

          {isAdding && (
            <div className={`mb-4 space-y-3 ${formAnimation}`}>
              <div className="flex items-center space-x-3">
                {newEntry.avatar ? (
                  <div className="relative">
                    <Image
                      src={newEntry.avatar}
                      alt="Avatar preview"
                      width={48}
                      height={48}
                      className="rounded-full object-cover w-12 h-12"
                    />
                    <button
                      onClick={() => setNewEntry(prev => ({ ...prev, avatar: '' }))}
                      className="absolute -top-1 -right-1 p-0.5 bg-red-500 text-white rounded-full 
                        hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 
                      flex items-center justify-center group-hover:bg-gray-200 
                      dark:group-hover:bg-gray-600 transition-colors">
                      <ImageIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
                <div className="flex-1">
                  <input
                    type="text"
                    value={newEntry.name}
                    onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
                    placeholder="Name"
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                      placeholder-gray-500 dark:placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
              </div>

              {renderAddressInput()}

              <textarea
                value={newEntry.notes}
                onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                placeholder="Notes (optional)"
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                  placeholder-gray-500 dark:placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                rows={3}
              />

              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCancel}
                  className={`px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 
                    dark:hover:text-white ${textButtonAnimation}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!newEntry.name || !newEntry.address}
                  className={`px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${textButtonAnimation}`}
                >
                  {editingId ? 'Save' : 'Add'}
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {filteredEntries.slice(0, 5).map((entry, index) => (
              <div
                key={entry.id}
                className={`flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 
                  rounded-lg transition-all group ${listItemAnimation}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  {entry.avatar ? (
                    <Image
                      src={entry.avatar}
                      alt={entry.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover w-8 h-8"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">{entry.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {entry.ensName || entry.address}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <button
                    onClick={() => startEdit(entry)}
                    className={`p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 
                      dark:hover:text-white transition-colors rounded-full 
                      hover:bg-gray-100 dark:hover:bg-gray-700 ${iconButtonAnimation}`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id, entry.name)}
                    className={`p-1 text-red-500 hover:text-red-600 transition-colors 
                      rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 ${deleteIconAnimation}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <EditConfirmationModal
          isOpen={editModal.isOpen}
          onClose={() => setEditModal({ isOpen: false, entry: null })}
          onConfirm={confirmEdit}
          name={newEntry.name}
        />

        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, id: '', name: '' })}
          onConfirm={confirmDelete}
          name={deleteModal.name}
        />
      </>
    );
  }

  return (
    <>
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 w-full ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Address Book</h2>
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
              transition-colors text-sm flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Address</span>
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search addresses..."
            className="w-full px-4 py-2 pl-10 text-sm border border-gray-200 dark:border-gray-700 rounded-lg
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-500" />
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {isAdding && (
            <div className={`py-4 space-y-4 ${formAnimation}`}>
              <div className="flex items-center space-x-4">
                {newEntry.avatar ? (
                  <div className="relative">
                    <Image
                      src={newEntry.avatar}
                      alt="Avatar preview"
                      width={48}
                      height={48}
                      className="rounded-full object-cover w-12 h-12"
                    />
                    <button
                      onClick={() => setNewEntry(prev => ({ ...prev, avatar: '' }))}
                      className="absolute -top-1 -right-1 p-0.5 bg-red-500 text-white rounded-full 
                        hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 
                      flex items-center justify-center group-hover:bg-gray-200 
                      dark:group-hover:bg-gray-600 transition-colors">
                      <ImageIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
                <div className="flex-1">
                  <input
                    type="text"
                    value={newEntry.name}
                    onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
                    placeholder="Name"
                    className="w-full px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                      placeholder-gray-500 dark:placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
              </div>

              {renderAddressInput()}

              <textarea
                value={newEntry.notes}
                onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                placeholder="Notes (optional)"
                className="w-full px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                  placeholder-gray-500 dark:placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                rows={3}
              />

              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCancel}
                  className={`px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 
                    dark:hover:text-white ${textButtonAnimation}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!newEntry.name || !newEntry.address}
                  className={`px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${textButtonAnimation}`}
                >
                  {editingId ? 'Save' : 'Add'}
                </button>
              </div>
            </div>
          )}

          {filteredEntries.map((entry, index) => (
            <div
              key={entry.id}
              className={`py-4 flex items-center justify-between ${listItemAnimation}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center space-x-4 min-w-0">
                {entry.avatar ? (
                  <Image
                    src={entry.avatar}
                    alt={entry.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-10 h-10"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700" />
                )}
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white">{entry.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {entry.ensName || entry.address}
                  </p>
                  {entry.notes && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{entry.notes}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => startEdit(entry)}
                  className={`p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 
                    dark:hover:text-white transition-colors rounded-full 
                    hover:bg-gray-100 dark:hover:bg-gray-700 ${iconButtonAnimation}`}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(entry.id, entry.name)}
                  className={`p-1 text-red-500 hover:text-red-600 transition-colors 
                    rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 ${deleteIconAnimation}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EditConfirmationModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, entry: null })}
        onConfirm={confirmEdit}
        name={newEntry.name}
      />

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: '', name: '' })}
        onConfirm={confirmDelete}
        name={deleteModal.name}
      />
    </>
  );
};
