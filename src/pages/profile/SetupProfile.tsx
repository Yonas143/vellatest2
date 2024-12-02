import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/useAuthStore';

const profileSchema = z.object({
  occupation: z.string().min(2, 'Occupation is required'),
  bio: z.string()
    .min(50, 'Bio must be at least 50 characters')
    .max(500, 'Bio cannot exceed 500 characters'),
  interests: z.array(z.string())
    .min(3, 'Please select at least 3 interests')
    .max(10, 'You can select up to 10 interests'),
  photos: z.array(z.string())
    .min(1, 'Please upload at least 1 photo')
    .max(6, 'You can upload up to 6 photos'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const INTEREST_OPTIONS = [
  'Travel', 'Music', 'Reading', 'Sports', 'Cooking',
  'Art', 'Photography', 'Dancing', 'Movies', 'Technology',
  'Fashion', 'Fitness', 'Food', 'Nature', 'Pets',
];

export const SetupProfile: React.FC = () => {
  const { user, loading } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = 
    useForm<ProfileFormData>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        interests: [],
        photos: [],
      },
    });

  const selectedInterests = watch('interests', []);
  const photos = watch('photos', []);

  const onSubmit = async (data: ProfileFormData) => {
    console.log('Profile data:', data);
    // Handle profile setup
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you would upload these to your server/storage
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setValue('photos', [...photos, ...newPhotos]);
    }
  };

  const toggleInterest = (interest: string) => {
    const current = selectedInterests;
    const updated = current.includes(interest)
      ? current.filter(i => i !== interest)
      : [...current, interest];
    setValue('interests', updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Complete Your Profile
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6 space-y-6">
            <Input
              label="Occupation"
              error={errors.occupation?.message}
              {...register('occupation')}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                {...register('bio')}
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.bio && (
                <p className="text-sm text-red-600">{errors.bio.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedInterests.includes(interest)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              {errors.interests && (
                <p className="text-sm text-red-600">{errors.interests.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Photos
              </label>
              <div className="grid grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={photo}
                      alt={`Profile photo ${index + 1}`}
                      className="object-cover w-full h-full rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setValue('photos', photos.filter((_, i) => i !== index))}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {photos.length < 6 && (
                  <label className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:border-gray-400">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <span className="text-gray-600">+ Add Photo</span>
                  </label>
                )}
              </div>
              {errors.photos && (
                <p className="text-sm text-red-600">{errors.photos.message}</p>
              )}
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full"
            >
              Complete Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};