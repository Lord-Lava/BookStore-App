/**
 * Data Transfer Object for authentication responses
 * Used for both login and signup responses
 */
class AuthResponseDto {
  constructor(message, token, user = null) {
    this.message = message;
    this.token = token;
    
    // Optionally include user data without sensitive information
    if (user) {
      this.user = {
        id: user.id,
        email: user.email
        // Add any other non-sensitive user fields here
      };
    }
  }

  // Create a successful auth response
  static success(message, token, user = null) {
    return new AuthResponseDto(message, token, user);
  }
}

module.exports = AuthResponseDto;
