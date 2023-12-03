import Image from 'next/image';
import Right from '../icons/Right';

export default function Hero () {
    return (
        <section className='grid grid-cols-2'>
            <div className='py-12 '>
              <h1 className='text-4xl font-semibold'>Everything is better with a pizza</h1>
              <p className='mt-4 text-gray-700'>Pizza is the missing piece that makes every day complete , a simple yet delicious joy in life</p>
              <div className='flex items-center gap-4'>
                <button className='bg-primary text-sm uppercase text-white px-4 py-2 rounded-full flex items-center gap-2  '>
                    Order now
                    <Right />
                    </button>
                <button className='flex  gap-2 py-2 text-gray-600 font-semibold'>
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