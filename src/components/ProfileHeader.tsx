
import React from 'react';
import { Card } from '@/components/ui/card';

const ProfileHeader = ({ researcher }) => {
  return (
    <Card className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
      <div className="w-24 h-24 bg-orcid-gray rounded-full flex items-center justify-center text-white text-3xl font-bold">
        {researcher.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
      </div>
      
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-orcid-dark">{researcher.name}</h1>
            <p className="text-orcid-gray">{researcher.institution}</p>
          </div>
          <div className="flex items-center bg-orcid-green px-3 py-1 rounded text-white">
            <span className="mr-2">ORCID:</span>
            <a href={`https://orcid.org/${researcher.orcidId}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {researcher.orcidId}
            </a>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-orcid-dark">{researcher.bio}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {researcher.researchAreas.map((area, index) => (
              <span key={index} className="bg-orcid-light text-orcid-dark px-2 py-1 rounded-md text-sm">
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeader;
