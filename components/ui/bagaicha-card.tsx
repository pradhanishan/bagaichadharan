import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import bagaichaImage from '@/public/bagaicha.jpeg';
import Image from 'next/image';

function BagaichaCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="shadow-lg mx-auto my-8 max-w-2xl border border-gray-300 rounded-lg">
      <CardHeader className="bg-green-800 p-4 rounded-t-lg flex items-center">
        <div className="flex gap-4 w-full justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-yellow-500">Bagaicha Restro And Bar</CardTitle>
          </div>
          <div className="flex-shrink-0 mr-4">
            <Image src={bagaichaImage} alt="Bagaicha image logo" width={280} height={120} className="rounded" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 bg-gray-50">{children}</CardContent>
    </Card>
  );
}
export { BagaichaCard };
