m.models.Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) return debug(err);
      debug(role);
 
      // Make Bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      }, function(err, principal) {
        if (err) return debug(err);
        debug(principal);
      });
    });