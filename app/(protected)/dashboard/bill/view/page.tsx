import { PaginatedTransactions } from '@/components/bill/paginated-transactions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import bagaichaImage from '@/public/bagaicha.jpeg';
// Replace with your actual Image component import
import Image from 'next/image';

async function ViewTransactions() {
  return (
    <Card className="shadow-lg mx-auto my-8 max-w-2xl border border-gray-300 rounded-lg">
      <CardHeader className="bg-green-800 p-4 rounded-t-lg flex items-center">
        <div className="flex gap-4 w-full justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-yellow-500">Bagaicha Restro And Bar</CardTitle>

            <CardDescription className="mt-2 text-sm text-gray-300">
              <span className="font-semibold">Recent transactions</span> {/* Replace with your actual data handling */}
            </CardDescription>
          </div>
          <div className="flex-shrink-0 mr-4">
            <Image src={bagaichaImage} alt="Bagaicha image logo" width={280} height={120} className="rounded" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 bg-gray-50">
        <PaginatedTransactions />
      </CardContent>
    </Card>
  );
}

export default ViewTransactions;
