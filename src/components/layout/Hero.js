import Image from 'next/image';
import Right from '../icons/Right';

export default function Hero () {
    return (
        <section className='hero mt-4' >
            <div className='py-12 '>
              <h1 className='text-4xl font-semibold leading-[50px]'>Everything is better with a pizza</h1>
              <p className='my-6 py text-gray-700 text-sm '>Pizza is the missing piece that makes every day complete , a simple yet delicious joy in life</p>
              <div className='flex items-center gap-4'>
                <button className='bg-primary text-sm uppercase flex items-center  text-white px-4 py-2 rounded-full flex items-center gap-2  '>
                    Order now
                    <Right />
                    </button>
                <button className='flex border-0 items-center  gap-2 py-2 text-gray-600 font-semibold'>
                    learn more
                    <Right />
                </button>
              </div>
            </div>
            <div className='relative'>
              <Image src={'/pizza.png'} alt={'pizza'}  layout={'fill'} objectFit={'contain'}  />
            </div>
        </section>
    )
}