import { User } from "lucide-react";

export default function ManagementTeam() {
  const team = [
    {
      name: "Minal Pote",
      position: "Chief Financial Officer",
      experience: "10+ years experience in finance"
    }
  ];

  return (
    <div className="mt-20">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center" data-testid="management-title">
        Leadership Team
      </h3>
      <div className="flex justify-center">
        {team.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center" data-testid={`team-member-${index}`}>
            <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-blue-100 flex items-center justify-center" data-testid={`team-icon-${index}`}>
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-1" data-testid={`team-name-${index}`}>
              {member.name}
            </h4>
            <p className="text-primary font-medium mb-2" data-testid={`team-position-${index}`}>
              {member.position}
            </p>
            <p className="text-secondary text-sm" data-testid={`team-experience-${index}`}>
              {member.experience}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
