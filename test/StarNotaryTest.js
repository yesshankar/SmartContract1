const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => { 

    let user1 = accounts[1]
    let user2 = accounts[2]
    let randomMaliciousUser = accounts[3]

    let name = 'awesome star!'
    let starStory = "this star was bought for my wife's birthday"
    let ra = "1"
    let dec = "1"
    let mag = "1"
    let starId = 1

    beforeEach(async function() { 
        this.contract = await StarNotary.new({from: accounts[0]})
    })

    describe('can create a star', () => { 
        it('can create a star and get its name', async function () { 
             // Create Star and check if its name match.
             await this.contract.createStar(name, starStory, ra, dec, mag, starId, {from: accounts[0]})
             let starInfo = await this.contract.tokenIdToStarInfo(starId)
             assert.equal(starInfo[0], 'awesome star!')
        })
    })

    describe('star uniqueness', () => {
         // first we mint our first star
        beforeEach(async function () { 
            await this.contract.createStar(name, starStory, ra, dec, mag, 11, {from: accounts[0]})
        })

        it('only stars unique stars can be minted', async function() { 
           
            // then we try to mint the same star(with ra, dec and mag repeated)
            let duplicteExist = await this.contract.checkIfStarExist(ra, dec, mag)
            assert.equal(duplicteExist, true)
        })

        it('only stars unique stars can be minted even if their ID is different', async function() { 
            // then we try to mint the same star, and we expect an error (no creation for id 12)
            try {
                await this.contract.createStar(name, starStory, ra, dec, mag, 12, {from: accounts[0]})
            } catch (error) {
                let starInfo = await this.contract.tokenIdToStarInfo(12)
                assert.equal(starInfo[0], 0)
            }

        })

        it('minting unique stars does not fail', async function() { 
            for(let i = 2; i < 10; i ++) { 
                let id = i
                let newRa = i.toString()
                let newDec = i.toString()
                let newMag = i.toString()

                await this.contract.createStar(name, starStory, newRa, newDec, newMag, id, {from: user1})

                let starInfo = await this.contract.tokenIdToStarInfo(id)
                assert.equal(starInfo[0], name)
            }
        })
    })

    describe('buying and selling stars', () => { 

        let starPrice = web3.toWei(.01, "ether")

        beforeEach(async function () { 
            await this.contract.createStar(name, starStory, ra, dec, mag, starId, {from: user1})
        })

        it('user1 can put up their star for sale', async function () { 
            // Check if the owner is same
            assert.equal(await this.contract.ownerOf(starId), user1)
        })

        describe('user2 can buy a star that was put up for sale', () => { 
            beforeEach(async function () { 
                await this.contract.putStarUpForSale(starId, starPrice, {from: user1})
            })

            it('user2 is the owner of the star after they buy it', async function() { 
                // First buy it and then check the owner
                await this.contract.buyStar(starId, {from: user2, value: starPrice, gasPrice: 0})
                assert.equal(await this.contract.ownerOf(starId), user2)
            })

            it('user2 ether balance changed correctly', async function () { 
                
                let overpaidAmount = web3.toWei(.05, 'ether')
                const balanceBeforeTransaction = web3.eth.getBalance(user2)
                await this.contract.buyStar(starId, {from: user2, value: overpaidAmount, gasPrice: 0})
                const balanceAfterTransaction = web3.eth.getBalance(user2)

                assert.equal(balanceBeforeTransaction.sub(balanceAfterTransaction), starPrice)
            })
        })
    })

    describe("transfer between user occurs safely", () => {

        beforeEach(async function () { 

            // first create the star
            await this.contract.createStar(name, starStory, ra, dec, mag, starId, {from: user1});                   
        })

        it("user1 can transfer a star to user 2", async function() {
           
            await this.contract.safeTransferFrom(user1, user2, starId, {from: user1});    
            let newOwner = await this.contract.ownerOf(starId);                   
            assert.equal(newOwner, user2);
        });
    });

    describe("Tests for approve(), SetApprovalForAll(), getApproved() and isApprovedForAll()", () => {

        beforeEach(async function () { 

            // first create the star
            await this.contract.createStar(name, starStory, ra, dec, mag, starId, {from: user1});                   
        })

        it("user1 can approve user2", async function() {
           
            await this.contract.approve(user2, starId, {from: user1});    
            let approvedAccount = await this.contract.getApproved(starId, {from: user1});   
            assert.equal(approvedAccount, user2);
                            
        });

        it("sets setApprovalForAll() to false and checks if isApprovedForAll() is false", async function(){
            await this.contract.setApprovalForAll(user2, false, {from: user1});                          
            let isApproved = await this.contract.isApprovedForAll(user1, user2);                  
            assert.equal(isApproved, false);
        })
    });

})

var expectThrow = async function(promise) { 
    try { 
        await promise
    } catch (error) { 
        assert.exists(error)
        return 
    }

    assert.fail('expected an error, but none was found')
}
