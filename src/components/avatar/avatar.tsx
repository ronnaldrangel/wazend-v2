
import md5 from "md5"
import Image from "next/image"

const Gravatar = ({ email = '', size = 200, className = "h-8 w-8 rounded-full" }) => {
  const getGravatarUrl = (email: string, size: number) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=retro`;
  };

  const avatarUrl = getGravatarUrl(email || 'nulled', size);

  return <Image className={className} src={avatarUrl} alt="User Avatar" width={size} height={size} />;
};

export default Gravatar;
