export default function ManagementTeam() {
  const team = [
    {
      name: "Minal Pote",
      position: "Chief Financial Officer",
      experience: "10+ years experience in finance",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
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
            <img 
              src={member.image}
              alt={`Professional headshot of ${member.name}`}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              data-testid={`team-image-${index}`}
            />
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
