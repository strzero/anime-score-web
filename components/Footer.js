import Image from 'next/image'

const Footer = () => {
    return (
      <footer className="py-4 text-center">
        {/* 文本部分 */}
        <p className="text-sm">
          条目信息来源于 <a href="https://bgm.tv" className="text-blue-600 hover:underline">Bangumi 番组计划</a> 通过 Creative Commons BY-SA License 授权
        </p>
  
        {/* 图片部分 */}
        <div className="mt-4">
          <Image 
            src="/by-nc.png" 
            alt="Creative Commons License" 
            className="mx-auto" 
            width={100} 
            height={100} 
          />
        </div>
      </footer>
    );
  };
  
  export default Footer;
  