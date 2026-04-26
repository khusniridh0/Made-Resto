'use client'

import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import React, { ChangeEvent, DragEvent, useRef, useState } from 'react'

interface FileUploadProps {
  children: React.ReactNode
  onFileSelect: (file: File | null) => void
  accept?: string
  maxSize?: number // in MB
  className?: string
  previewUrl?: string // URL for initial preview (for editing existing images)
}

export function FileUpload({
  children,
  onFileSelect,
  accept = "image/*",
  maxSize = 5,
  className,
  previewUrl: initialPreviewUrl
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialPreviewUrl || null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFile = (file: File) => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`)
      return
    }

    // Check file type
    if (accept !== "*" && !file.type.match(accept.replace('*', '.*'))) {
      alert(`File type must be ${accept}`)
      return
    }

    setSelectedFile(file)
    onFileSelect(file)

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    onFileSelect(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  // Effect to handle initial preview URL changes
  React.useEffect(() => {
    if (initialPreviewUrl !== undefined) {
      setPreviewUrl(initialPreviewUrl)
      setSelectedFile(null) // Clear any selected file when initial URL is provided
    }
  }, [initialPreviewUrl])

  const handleClick = () => {
    inputRef.current?.click()
  }

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="hidden"
      />

      {!selectedFile && !previewUrl ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragOver
              ? "border-[var(--color-orange-primary)] bg-[var(--color-orange-primary)]/10"
              : "border-[var(--color-dark-line)] hover:border-[var(--color-orange-primary)]"
          )}
        >
          {children}
        </div>
      ) : (
        <div className="border border-[var(--color-dark-line)] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <p className="font-medium">
                  {selectedFile ? selectedFile.name : 'Existing image'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : 'Image loaded from URL'}
                </p>
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
